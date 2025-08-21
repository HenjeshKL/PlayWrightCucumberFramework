const{test, expect}= require('@playwright/test');

test.skip("clientApp Example", async ({page})=>
{
      const productName="ZARA COAT 3";
      const products= page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client/");
      console.log (await page.title());
      // locators-mainly used CSS selectors
      await page.locator("#userEmail").fill("sachinten@gmail.com");
      await page.locator("#userPassword").fill("Iamhero@0000");
      await page.locator("[type='submit']").click();
      await page.waitForLoadState("networkidle");
      //await page.locator(".card-body b").first().waitFor();
      const titles=await page.locator(".card-body b").allTextContents();
      console.log(titles);
      const count=await products.count();

      for(let i=0; i<count; ++i)
      {
        const productText=await products.nth(i).locator("b").textContent()
       if( productText== productName)
       {
        await products.nth(i).locator("text= Add To Cart").click();
        break;

       }
      }
    //await page.pause();

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
   const boo= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(boo).toBeTruthy

   await page.locator("text=Checkout").click();
   await page.locator("[placeholder='Select Country']").pressSequentially("ind");
   const dropDown= page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount= await dropDown.locator("button").count();
   for(let i=0; i<optionsCount; ++i)
   {
    const text= await dropDown.locator("button").nth(i).textContent();
    if(text=== " India")
    {
        await dropDown.locator("button").nth(i).click();
        break;

    }

   }

await page.locator("div [name='coupon']").fill("rahulshettyacademy");
await page.locator("[class*='btn-primary']").click();
//await page.pause();
await page.locator(".action__submit").click();
await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);

//await page.pause();

await page.locator("button[routerlink*=myorders]").click();
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