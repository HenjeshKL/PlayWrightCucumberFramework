const{test, expect}= require('@playwright/test');

test("clientApp Example", async ({page})=>
{
      const productName="ZARA COAT 3";
      const products= page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client/");
      console.log (await page.title());
      // locators-mainly used CSS selectors
      await page.getByPlaceholder("email@example.com").fill("sachinten@gmail.com");
      await page.getByPlaceholder("enter your passsword").fill("Iamhero@0000");
      await page.getByRole("button",{name:"Login"}).click();
      await page.waitForLoadState("networkidle");
      //await page.locator(".card-body b").first().waitFor();
      const titles=await page.locator(".card-body b").allTextContents();
      console.log(titles);
      
      await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();

   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   
   await page.getByRole("button",{name:"Checkout"}).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button", {name:"India"}).nth(1).click();

await page.locator("div [name='coupon']").fill("rahulshettyacademy");
await page.locator("[class*='btn-primary']").click();
//await page.pause();
await page.getByText("Place Order ").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);

//await page.pause();

await page.getByRole("button",{name:"  ORDERS"}).click();
await page.locator("[class*='table-bordered']").waitFor();
const rows= page.locator("tbody tr");

for(let i=0; i<await rows.count(); ++i)
{

const rowOrderId= await rows.locator("th").nth(i).textContent();
if(orderId.includes(rowOrderId))
{
  
  await rows.nth(i).locator("button").first().click();
  break;
}

const orderIdDetails=await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();

}

});