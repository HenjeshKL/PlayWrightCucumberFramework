// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require("../PageObjects/LoginPage");
// const { DashboardPage } = require("../PageObjects/DashboardPage");
// const { CartPage } = require("../PageObjects/CartPage");

// test("Page Objects ", async ({ page }) => {
//   const userName = "sachinten@gmail.com";
//   const password = "Iamhero@0000";
//   const productName = "ZARA COAT 3";
//   const products = page.locator(".card-body");

//   const loginpage = new LoginPage(page);
//   await loginpage.goTo();
//   await loginpage.validLogin(userName, password);

//   const dashboardPage = new DashboardPage(page);
//   await dashboardPage.searchProductAndAddCart(productName);
//   await dashboardPage.navigateToCart();

//   const cartpage=new CartPage(page)
//   await cartpage.dropDown();

//   //await page.locator(".card-body b").first().waitFor();
//   //await page.pause();

//   // await page.locator("div li").first().waitFor();
//   // const boo = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//   // expect(boo).toBeTruthy

//   // await page.locator("text=Checkout").click();
//   // await page.locator("[placeholder='Select Country']").pressSequentially("ind");
//   // const dropDown = page.locator(".ta-results");
//   // await dropDown.waitFor();
//   // const optionsCount = await dropDown.locator("button").count();
//   // for (let i = 0; i < optionsCount; ++i) {
//   //   const text = await dropDown.locator("button").nth(i).textContent();
//   //   if (text === " India") {
//   //     await dropDown.locator("button").nth(i).click();
//   //     break;

//   //   }

//   // }

//   await page.locator("div [name='coupon']").fill("rahulshettyacademy");
//   await page.locator("[class*='btn-primary']").click();
//   //await page.pause();
//   await page.locator(".action__submit").click();
//   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//   console.log(orderId);

//   //await page.pause();

//   await page.locator("button[routerlink*=myorders]").click();
//   await page.locator("[class*='table-bordered']").waitFor();
//   const rows = page.locator("tbody tr");

//   for (let i = 0; i < await rows.count(); ++i) {

//     const rowOrderId = await rows.locator("th").nth(i).textContent();
//     if (orderId.includes(rowOrderId)) {

//       await rows.nth(i).locator("button").first().click();
//       break;
//     }

//     const orderIdDetails = await page.locator(".col-text").textContent();
//     expect(orderId.includes(orderIdDetails)).toBeTruthy();

//   }

// });



const {test, expect} = require('@playwright/test');
const {customtest}= require('../Utils/test-base');
const {POManager} = require('../PageObjects/POManager');

//JSON-->string-->JS object
const dataSet=JSON.parse(JSON.stringify(require('../Utils/PlaceOrderData.json')));

for(const data of dataSet)
{
test(`Client App login for ${data.productName}`, async ({page})=>
{
  const poManager = new POManager(page);
   //js file- Login js, DashboardPage
    // const username = "sachinten@gmail.com";
    // const password = "Iamhero@0000"
    // const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(data.productName);
   await cartPage.Checkout();

   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind","India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}

customtest(`Client App login `, async ({page,testDataForOrder})=>
  {
    const poManager = new POManager(page);
     //js file- Login js, DashboardPage
      // const username = "sachinten@gmail.com";
      // const password = "Iamhero@0000"
      // const productName = 'ZARA COAT 3';
      const products = page.locator(".card-body");
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();
  
     const cartPage = poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
     await cartPage.Checkout();



}
)






