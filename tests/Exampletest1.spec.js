const{test}= require('@playwright/test');

test("Browser context playwright test", async ({page})=>
{
      await page.goto("https://rahulshettyacademy.com/client/");
      console.log (await page.title());
      // locators-mainly used CSS selectors
      await page.locator("#userEmail").fill("sachinten@gmail.com");
      await page.locator("#userPassword").fill("Iamhero@0000");
      await page.locator("[type='submit']").click();
      //await page.waitForLoadState("networkidle");
      await page.locator(".card-body b").first().waitFor();
      const titles=await page.locator(".card-body b").allTextContents();
      console.log(titles);

});