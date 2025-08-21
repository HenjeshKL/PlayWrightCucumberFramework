const{test,expect}=require('@playwright/test')


test.describe.configure({mode:'serial'});

test("Screen shot" , async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    


    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'screenshot1.jpg'});
    await page.locator("#hide-textbox").click();
    page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framePage=page.frameLocator("#courses-iframe");
    
    framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck=await framePage.locator(".text h2").textContent();
   console.log (textCheck.split(" ")[1]);

}
)

test("visual testing" , async ({page})=>
    {
    
        await page.goto("https://www.google.com");

       expect(await page.screenshot()).toMatchSnapshot('google.png');



})