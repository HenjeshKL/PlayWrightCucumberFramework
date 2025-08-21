class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
    this.signInButton = page.locator("[type='submit']")
  }

  async goTo() 
  {

    await this.page.goto("https://rahulshettyacademy.com/client/");

  }

  async validLogin(userName, password) {

    await this.userName.type(userName);
    await this.password.type(password);
    await this.signInButton.click();

    await this.page.waitForLoadState("networkidle");

  }

}

module.exports = { LoginPage };