const{test, expect}= require('@playwright/test');

test("Browser context playwright test", async ({browser})=>
{
     const context=await browser.newContext();
     const page=await context.newPage();
     

     const userName=page.locator("#username");
     const signIn=page.locator("[type='submit']");
     const cardTitles=page.locator(".card-body a");

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log (await page.title());
       // locators-mainly used CSS selectors

      await userName.fill("rahulshetty");
      await page.locator("[name='password']").fill("learning");
      await signIn.click();

      console.log( await page.locator("[style*='block']").textContent());

      await expect( page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);



});

test("Page playwright test", async ({page})=>
    {
           await page.goto("https://google.com");
           // get tittle assertion

          console.log (await page.title());
          await expect(page).toHaveTitle("Google");

    });

 test("UI controls", async({page})=>
    {


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


    await page.locator("#username").fill("rahulshetty");
    await page.locator("[name='password']").fill("learning");
    await page.locator("[type='submit']");
    const documentLinks=page.locator("[href*='documents-request']")
    const dropdown= page.locator("select.form-control")
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLinks).toHaveAttribute("class","blinkingText");

    //asseration
    //await page.pause();

 });

 test("child window handling", async({browser})=>
{
 const context=await browser.newContext();
 const page=await context.newPage();
 const userName=await page.locator("#username");
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const documentLinks=page.locator("[href*='documents-request']");

const [newPage]=await Promise.all(
[

    context.waitForEvent('page'),
    documentLinks.click(),

])

 const text=await newPage.locator(".red").textContent();
 console.log(text);

 const arrayText= text.split("@");
 const domain=arrayText[1].split(" ")[0];
 console.log(domain);

await userName.fill(domain);
//await page.pause();

});
