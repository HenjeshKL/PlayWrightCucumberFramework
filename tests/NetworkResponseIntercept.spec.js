const{test, expect,request}= require('@playwright/test');
const {APiUtils}=require("../Utils/APiUtils");

const loginPayload={userEmail: "sachinten@gmail.com", userPassword: "Iamhero@0000"};
const orderPayload= {orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakePayLoadOrders={data:[],message:"No Orders"};
let response;

test.beforeAll(async()=>
{

   const apiContext= await request.newContext();
   const apiutils=new APiUtils(apiContext,loginPayload);
   response=await apiutils.createOrder(orderPayload);
    
});

test("clientApp Example", async ({page})=>
{

 page.addInitScript(value=>
    {window.localStorage.setItem('token', value)},
    
    response.token);

      const productName="ZARA COAT 3";
      const products= page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client/");
     
//await page.pause();
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",//* -wild card enter generic value any order id can have
async route=>
{
  //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
 const response=await page.request.fetch(route.request());
let body=JSON.stringify(fakePayLoadOrders);
route.fulfill(
{
response,
body,
});
});



await page.locator("button[routerlink*=myorders]").click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4 ").textContent());
// await page.locator("[class*='table-bordered']").waitFor();
// const rows= page.locator("tbody tr");


});