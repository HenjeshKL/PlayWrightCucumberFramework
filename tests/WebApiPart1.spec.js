const{test, expect,request}= require('@playwright/test');
const {APiUtils}=require("../Utils/APiUtils")

const loginPayload={userEmail: "sachinten@gmail.com", userPassword: "Iamhero@0000"};
const orderPayload= {orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};

let response;

test.beforeAll(async()=>
{

   const apiContext= await request.newContext();



   const apiutils=new APiUtils(apiContext,loginPayload);
   response=await apiutils.createOrder(orderPayload);
    
});


test("@API clientApp Example", async ({page})=>
{

 page.addInitScript(value=>
    {window.localStorage.setItem('token', value)},
    
    response.token);

      const productName="ZARA COAT 3";
      const products= page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client/");
     
//await page.pause();

await page.locator("button[routerlink*=myorders]").click();
await page.locator("[class*='table-bordered']").waitFor();
const rows= page.locator("tbody tr");

for(let i=0; i<await rows.count(); ++i)
{

const rowOrderId= await rows.locator("th").nth(i).textContent();
if(response.orderId.includes(rowOrderId))
{
  
  await rows.nth(i).locator("button").first().click();
  break;
}

const orderIdDetails=await page.locator(".col-text").textContent();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

}

});