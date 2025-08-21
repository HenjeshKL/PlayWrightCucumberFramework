// @ts-check
import { defineConfig, devices } from '@playwright/test';

  export default defineConfig({
  testDir: './tests',
  //retries:2,
  reporter: 'html',

  globalSetup: 'TemelioPOM/Test-base.js',
  use: {
    storageState: './TemelioUtils/state.json', // Reuse saved login session
    headless: false, // Default for all projects unless overridden
    // viewport: null, // Needed to launch with full screen
    // launchOptions: {
    //   args: ['--start-maximized'], // Works for Chromium browsers
    // },
    browserName : 'chromium',
    screenshot: 'on',
    trace: 'on',
    video: 'on',
    viewportiewport: { width: 1680, height: 1050 },
    permissions: ['geolocation'], //allow location pop up
    ignoreHTTPSErrors: true //ssl certification override
  },
  
//   use: 
//   {
//    viewport: null, // disables fixed viewport
//    viewport: { width: 1280, height: 800 },
//    browserName : 'chromium',
//    headless : false,
//    screenshot: 'on',
//    trace :'on',
//    viewport: null, // Important: allows full window size
//    launchOptions: {
//    args: ['--start-maximized'], // Chrome-specific flag
//     },

//   },
})