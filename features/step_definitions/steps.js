const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
const { LoginPage } = require('../../PageObjects/LoginPage');
const { chromium } = require('playwright');

Given('login to Ecommerce application with {string} and {string}', { timeout: 30 * 1000 }, async function (username, password) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  const loginPage = new LoginPage(this.page);
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When('ADD {string} to cart', { timeout: 100 * 1000 }, async function (productName) {
  this.poManager = new POManager(this.page);
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in a cart', { timeout: 100 * 1000 }, async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

});

When('Enter valid details and Place the order', { timeout: 30 * 1000 }, async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);

});

Then('verify order is present in the OrderHistory', { timeout: 30 * 1000 }, async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});


Given('login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  const userName = this.page.locator("#username");
  const signIn = this.page.locator("[type='submit']");

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  await userName.fill(username);
  await this.page.locator("[name='password']").fill(password);
  await signIn.click();

});

Then('verify error message is displayed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");

});