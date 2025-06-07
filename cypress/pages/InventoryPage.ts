export class InventoryPage {
  verifyOnInventoryPage() {
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list', { timeout: 10000 }).should('exist');
  }

  getAllInventoryItems() {
    return cy.get('.inventory_item');
  }

  getItemByName(name: string) {
    return cy.contains('.inventory_item', name);
  }

  addItemToCartByName(name: string) {
    this.getItemByName(name)
      .find('button')
      .contains(/add to cart/i)
      .click();
  }

  removeItemFromCartByName(name: string) {
    this.getItemByName(name)
      .find('button')
      .contains(/remove/i)
      .click();
  }

  getCartBadgeCount() {
    return cy.get('.shopping_cart_badge');
  }

  openSortDropdown() {
    return cy.get('[data-test="product-sort-container"]').should('exist');
  }

  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    const map = {
      az: 'az',
      za: 'za',
      lohi: 'lohi',
      hilo: 'hilo',
    };
    this.openSortDropdown().select(map[option]);
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  getItemButtonByName(name: string) {
    return this.getItemByName(name).find('button');
  }

  getItemPriceByName(name: string) {
    return this.getItemByName(name).find('.inventory_item_price');
  }
}
