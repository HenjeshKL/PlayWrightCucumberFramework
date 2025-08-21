const{test}= require('@playwright/test')

test("flipkart login", async({page})=>{

    await page.goto("https://www.flipkart.com/account/login?ret=/")
    await page.locator("input[class='r4vIwl BV+Dqf']").fill("8884212065")
    //await page.locator("//span[contains(text(),'CONTINUE')]").click()
    await page.getByRole("button",{name: "Request OTP"}).click()


    await page.waitForTimeout(30000)

    await page.getByRole("button",{name: "Verify"}).click()

})