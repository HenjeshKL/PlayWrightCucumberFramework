const { test, expect } = require('@playwright/test');
const path = require('path');

test('Fill form and verify all fields', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Register.html');

  const productName="India"
  // Fill text fields
  await page.locator("[placeholder='First Name']").fill("albo")
  await page.locator("[placeholder='Last Name']").fill("tweety")
  await page.locator("textarea[class*='form-control']").fill("Shri Henjeru Siddeshwara Nilaya")
  await page.locator("input[type='email']").fill("albodreams@gmail.com")
  await page.locator("input[type='tel']").fill("9879828888")
 
  // Select gender (Male)
  await page.locator('input[value="Male"]').click()

  // Select hobbies (Cricket and Movies)
  await page.locator('input[type="checkbox"][value="Cricket"]').click()
  await page.locator('input[type="checkbox"][value="Movies"]').click()

  // Upload a file
  const filePath=page.locator('#imagesrc')
  await filePath.setInputFiles("/Users/henju/Downloads/Software_Test_Engineer (1).pdf")

  // Select Skills
  await page.selectOption('#Skills', { label: 'Java' });
  const skillsname= await page.locator("#Skills>>Option:checked").textContent()

  // Select Country
  //await page.selectOption('#countries', { label: 'India' });

  // Select Country from search box

  // await page.locator(".select2-selection").click()
  // await page.locator(".select2-search__field").fill("India")
  // await page.keyboard.press("Enter")

    // Select Country from search box -another method
    await page.locator(".select2-selection").click()
    await page.locator(".select2-search__field").pressSequentially("ind")
    const dropdown= page.locator(".select2-results")
    await dropdown.waitFor()
    const optionsCount=await dropdown.locator("li").count()
    for(let i=0; i<=optionsCount; i++)
    {
    const titletext=await dropdown.locator("li").nth(i).textContent()
    if(titletext===productName)
    {

      dropdown.locator("li").nth(i).click()
      break
    }

    }

  // Select Date of Birth
  await page.locator('#yearbox').selectOption("1990")
  await page.locator('select[placeholder="Month"]').selectOption("February")
  await page.locator('#daybox').selectOption("15")

  // Set Password
  await page.locator('#firstpassword' ).fill('Password123')
  await page.locator('#secondpassword').fill('Password123')

  // ✔️ Field Verification
  expect(await page.inputValue('input[placeholder="First Name"]')).toBe('albo');
  expect(await page.inputValue('input[placeholder="Last Name"]')).toBe('tweety');
  expect(await page.inputValue('input[type="email"]')).toBe('albodreams@gmail.com');
  expect(await page.inputValue('input[type="tel"]')).toBe('9879828888');
  expect(await page.inputValue('#firstpassword')).toBe('Password123');
  expect(await page.inputValue('#secondpassword')).toBe('Password123');
  expect(skillsname).toBe("Java")

  // You can also add assertions for the dropdown selections if needed
});