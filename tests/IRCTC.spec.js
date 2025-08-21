const { test, expect } = require('@playwright/test');

test("clientApp Example", async ({ page }) => {

    await page.goto("https://www.irctc.co.in/nget/train-search");
    //console.log(await page.title());

   await page.waitForLoadState()


    await page.locator("//label[text()='Person With Disability Concession']").click()

    await page.locator("//span[@class='ui-button-text ui-clickable']").click()

 
   

})

 //span[@class='ui-button-text ui-clickable']

//label[text()='Person With Disability Concession']

//label[text()='Flexible With Date']

//label[text()='Train with Available Berth']

//label[text()='Railway Pass Concession']