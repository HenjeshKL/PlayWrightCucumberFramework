import { test, expect } from '@playwright/test';

test.describe('Form Submission Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Register.html');
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Doe');
    await page.fill('textarea[ng-model="Adress"]', '123 Main St');
    await page.fill('input[ng-model="EmailAdress"]', 'john.doe@example.com');
    await page.fill('input[ng-model="Phone"]', '1234567890');
    await page.check('input[value="Male"]');
    await page.check('#checkbox1'); // Cricket
    await page.selectOption('#Skills', { label: 'Javascript' });
    //await page.selectOption('#countries', { label: 'India' });
    await page.click('.select2-selection--single');                  // open dropdown
    await page.fill('.select2-search__field', 'India');             // type value
    await page.keyboard.press('Enter');                             // confirm selection
    await page.selectOption('#yearbox', '1990');
    await page.selectOption('select[ng-model="monthbox"]', 'January');
    await page.selectOption('#daybox', '1');
    await page.fill('#firstpassword', 'Password123');
    await page.fill('#secondpassword', 'Password123');
    await page.click('#submitbtn');
    await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html'); // same URL reloads on submit
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.fill('input[ng-model="EmailAdress"]', 'invalid-email');
    await page.click('#submitbtn');
    await expect(page.locator('input[ng-model="EmailAdress"]')).toHaveClass(/ng-invalid-email/);
  });

  test('should show error for invalid phone number', async ({ page }) => {
    await page.fill('input[ng-model="Phone"]', 'abc123');
    await page.click('#submitbtn');
    await expect(page.locator('input[ng-model="Phone"]')).toHaveClass(/ng-invalid-pattern/);
  });

  test('should disable submit button with empty required fields', async ({ page }) => {
    await page.click('#submitbtn');
    await expect(page.locator('input[placeholder="First Name"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[placeholder="Last Name"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[ng-model="EmailAdress"]')).toHaveAttribute('required', '');
  });

  test('should refresh form on clicking Refresh button', async ({ page }) => {
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Doe');
    await page.click('#Button1'); // Refresh button
    await expect(page.locator('input[placeholder="First Name"]')).toHaveValue('');
    await expect(page.locator('input[placeholder="Last Name"]')).toHaveValue('');
  });

  test('should upload image file', async ({ page }) => {
    const filePath = '/Users/henju/Downloads/form.html'; // Replace with actual file path in your repo
    await page.setInputFiles('input[type="file"]#imagesrc', filePath);
    // No <img> preview reflects upload — add manual validation if needed
  });
});