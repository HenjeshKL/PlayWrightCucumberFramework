class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName) {

        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();

        for (let i = 0; i < count; ++i) {
            const productText = await this.products.nth(i).locator("b").textContent()
            if (productText == productName) {

                await this.products.nth(i).locator("text= Add To Cart").click();
                break;

            }
        }

    }

    async navigateToOrders() {

        await this.orders.click();

    }

    async navigateToCart()
{
    await this.cart.click();
}


}

module.exports = { DashboardPage };