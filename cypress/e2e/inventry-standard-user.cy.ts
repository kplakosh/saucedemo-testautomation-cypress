import { InventoryPage } from '../pages/InventoryPage';

const inventoryPage = new InventoryPage();

describe('Standard User – Inventory Page Tests', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
  });

  // === UI Rendering & Layout ===

  it('displays 6 products with name, price, image, and button', () => {
    inventoryPage.getAllInventoryItems().should('have.length', 6);
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('exist');
      cy.wrap($el).find('.inventory_item_price').should('exist');
      cy.wrap($el).find('img').should('be.visible');
      cy.wrap($el).find('button').should('exist');
    });
  });

  it('renders inventory correctly on mobile devices', () => {
    cy.viewport('iphone-6');
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('displays all prices in correct currency format', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el)
        .find('.inventory_item_price')
        .invoke('text')
        .should('match', /^\$\d+\.\d{2}$/);
    });
  });

    it('renders correctly on tablet viewport', () => {
    cy.viewport('ipad-2');
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('renders correctly on desktop viewport', () => {
    cy.viewport(1280, 720);
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('displays cart icon in the header', () => {
    cy.get('.shopping_cart_link').should('be.visible');
  });

  // === Sorting Functionality ===

  it('sorts products from A to Z and Z to A', () => {
    cy.get('[data-test="product-sort-container"]').should('exist');
    inventoryPage.sortBy('az');
    inventoryPage.getAllInventoryItems().first().should('contain.text', 'Sauce Labs Backpack');

    inventoryPage.sortBy('za');
    inventoryPage
      .getAllInventoryItems()
      .first()
      .should('contain.text', 'Test.allTheThings() T-Shirt (Red)');
  });

  it('defaults to sort A to Z on page load', () => {
    cy.get('[data-test="product-sort-container"]').should('have.value', 'az');
  });

  it('sorts products by price low to high and high to low', () => {
    inventoryPage.sortBy('lohi');
    inventoryPage
      .getAllInventoryItems()
      .first()
      .find('.inventory_item_price')
      .invoke('text')
      .then((text) => parseFloat(text.replace('$', '')))
      .should('be.lt', 10);

    inventoryPage.sortBy('hilo');
    inventoryPage
      .getAllInventoryItems()
      .first()
      .find('.inventory_item_price')
      .invoke('text')
      .then((text) => parseFloat(text.replace('$', '')))
      .should('be.gt', 40);
  });

  it('validates complete product order when sorted by price low to high', () => {
    inventoryPage.sortBy('lohi');
    inventoryPage.getAllInventoryItems().then(($items) => {
      const prices = [...$items].map((el) => {
        const priceText = el.querySelector('.inventory_item_price')?.textContent || '';
        return parseFloat(priceText.replace('$', ''));
      });
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  // === Cart Interactions ===

  it('adds a product to the cart and updates badge', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    inventoryPage.getCartBadgeCount().should('contain.text', '1');
  });

  it('removes a product from the cart and clears badge', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
    inventoryPage.getCartBadgeCount().should('not.exist');
  });

  it('adds multiple products and verifies badge count', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
    inventoryPage.getCartBadgeCount().should('contain.text', '2');
  });

  it('toggles between Add to Cart and Remove buttons', () => {
    const product = 'Sauce Labs Backpack';
    inventoryPage.addItemToCartByName(product);
    inventoryPage.getItemButtonByName(product).should('have.text', 'Remove');

    inventoryPage.removeItemFromCartByName(product);
    inventoryPage.getItemButtonByName(product).should('have.text', 'Add to cart');
  });

  it('retains cart state when navigating away and back', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    inventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.go('back');
    inventoryPage.getCartBadgeCount().should('contain.text', '1');
  });

  it('does not show cart badge when cart is empty', () => {
    inventoryPage.getCartBadgeCount().should('not.exist');
  });

  it('retains Add/Remove state when navigating back from product detail', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.go('back');
    inventoryPage.getItemButtonByName('Sauce Labs Backpack').should('have.text', 'Remove');
  });

  // === Product Detail Page ===

  it('navigates to product detail page via product name', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('contain.text', 'Sauce Labs Backpack');
  });

  it('navigates to product detail page via product image', () => {
    cy.contains('.inventory_item', 'Sauce Labs Backpack').find('img').click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('contain.text', 'Sauce Labs Backpack');
  });

  it('displays product name, price, and description on detail page', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.get('.inventory_details_name').should('exist');
    cy.get('.inventory_details_price').should('contain.text', '$29.99');
    cy.get('.inventory_details_desc').should('not.be.empty');
    cy.get('button').should('contain.text', 'Add to cart');
  });

  it('adds product to cart from product detail page', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.get('button').contains('Add to cart').click();
    inventoryPage.getCartBadgeCount().should('contain.text', '1');
  });

  // === Cart Page Navigation ===

  it('navigates to cart page from header', () => {
    inventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
  });
});