

const {  Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser, context, page;

Before({ tags: "@Regression or @Validations", timeout: 60 * 1000 }, async function () {
  console.log("[Before] Starting Login Setup...");
  

  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage(); 

});

After(async function () {
  console.log("[After] Cleaning up after Login...");
  
  if (this.page) await this.page.close();      // First close page
  if (this.context) await this.context.close(); // Then context
  if (this.browser) await this.browser.close(); // Finally browser
});

































// const {POManager} = require('../../PageObjects/POManager');

// const {chromium} = require('playwright');
// const { Before, After, BeforeStep,AfterStep, Status } = require('@cucumber/cucumber');

// //Before({tags : "@foo"},async function(){--tags will excute before each test
// Before(async function(){

//     const browser=await chromium.launch({ headless: true });
//     const context=await browser.newContext();
//     this.page=await context.newPage();
//     this.poManager = new POManager(this.page);

// });

// BeforeStep(async function(){

// });

// AfterStep(async function({result}){

//     if(result.status===Status.FAILED)
//     {

//       await this.page.screenshot({path:'screenshot.png'});  
//     }
// });

// Before( function(){

// console.log("i am last to execute")
// });