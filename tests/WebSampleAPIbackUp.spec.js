const{test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "swaroski.sowmya@gmail.com", userPassword: "Password@90"};
let token ;
 
test.beforeAll( async()=>
{
 
    const apicontext = await request.newContext();
    const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }
    )
    expect (loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
}
);
 
//Dynamically find the product
//section - 7 //session: 26 => write the script to dynamically find the product to buy from list of products
test("Dynamically find the product", async({page})=>
{
    page.addInitScript(value =>
       { window.localStorage.setItem('token',value)}, token );
 
    await page.goto("https://rahulshettyacademy.com/client");
 
    /*
    await page.locator('#userEmail').fill("anshika@gmail.com");
    await page.locator('#userPassword').fill("Iamking@000");
    await page.locator("[name=login]").click(); */
    //await page.waitForLoadState("networkidle");   
 
    const productName = "ZARA COAT 3";
    const product = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    const count = await product.count();
    for(let i=0; i<count; ++i)
    {
        if(await product.nth(i).locator("b").textContent() === productName){
            await product.nth(i).locator("text= Add to Cart").click();
            break;
        }
    }
    //section - 7 //session: 27 => Add assertions for the actions performed and implement necessary sync steps
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy;
 
   //section - 7 //session: 28 => Handling auto suggestive dropdown options with playwright
    await page.locator("text=checkout").click();
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind");
 
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsDd = await dropdown.locator("button").count();
    for(let i=0; i<optionsDd; ++i)
    {
        const optionText = await dropdown.locator("button").nth(i).textContent();
        if(optionText === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
   //section - 7 //session: 29 => Complete E2E flow of placing the order and grab the order id with playwright
    await expect(page.locator(".user__name [type=text]").first()).toHaveText("swaroski.sowmya@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
 
    //assignment
    //session: 31 => Dynamically find the order from Orderhistory page using playwright script logic
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
    for (let i=0;i<await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
        const orderdetails = await page.locator(".col-text").textContent();
        //console.log(orderdetails);
        expect(orderId.includes(orderdetails)).toBeTruthy();
    }
});
 