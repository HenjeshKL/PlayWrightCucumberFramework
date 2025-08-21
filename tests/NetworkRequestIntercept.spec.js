const{test,expect}=require('@playwright/test')

test("request intercept", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log (await page.title());
    // locators-mainly used CSS selectors
    await page.locator("#userEmail").fill("sachinten@gmail.com");
    await page.locator("#userPassword").fill("Iamhero@0000");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
   

    
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67ed0e03fc76541aad1c3453'}))

   
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");




    //await page.pause();


})