const{test, expect}= require('@playwright/test');

test("clientApp Example", async ({page})=>
{
    
      await page.goto("https://developer.salesforce.com/docs/apis");
      console.log (await page.title());


      await page.waitForLoadState('domcontentloaded');
     // await page.pause()
      // locators-mainly used CSS selectors
      // Step 1: Click "Discover" inside shadow DOM
//await page.locator('hgf-popover >> shadow=hgf-button.cll-button >> shadow=span.nav-item-label--cll').click();

await page.locator('hgf-popover >>> hgf-button.cll-button >>> span.nav-item-label--cll').click();

// Step 2: Wait for "Mobile SDK" to appear (optional for stability)
await page.locator('a[href="/developer-centers/mobile"]').waitFor({ state: 'visible' });

// Step 3: Click "Mobile SDK"
await page.locator('a[href="/developer-centers/mobile"]').click();

    
      })

//       <ul class="contextnav__nav-items-list--cll">
//   <li class="contextnav__nav-item contextnav__nav-item--cll">
//     <hgf-popover>
//       #shadow-root
//         <hgf-button>
//           #shadow-root
//             <span class="nav-item-label--cll">Discover</span>