const { chromium } = require('playwright');
const{test, expect}= require('@playwright/test');

test("upload file",async ({page}) => {
  // Launch browser
//   const browser = await chromium.launch({ headless: false }); // set true if you don't want UI
//   const context = await browser.newContext();
//   const page = await context.newPage();

  // Navigate to the target URL
  await page.goto("https://demo.automationtesting.in/Register.html"); // 🔁 Replace with your URL

  // Locate the file input element and upload the file
  const fileInput =  page.locator('#imagesrc'); // 🔁 Update selector if needed
 await fileInput.setInputFiles("/Users/henju/Downloads/Software_Test_Engineer (1).pdf"); // 🔁 Update path & file

  // Optional: Verify upload success (depends on the app behavior)
  // Example: Wait for a success message or uploaded file name to appear
  //await page.waitForSelector('text=Upload successful'); // 🔁 Adjust based on actual text

const result=await fileInput.inputValue()
expect(result).toContain("Software_Test_Engineer (1).pdf")

})