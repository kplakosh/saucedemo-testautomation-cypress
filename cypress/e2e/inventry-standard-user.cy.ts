import { InventoryPage } from '../pages/InventoryPage';

const inventoryPage = new InventoryPage();

describe('Standard User – Inventory Page Tests', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
  });

  // Page Load & Product Display Tests

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
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('displays all prices in correct currency format', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el)
        .find('.inventory_item_price')
        .invoke('text')
        .should('match', /^\$\d+\.\d{2}$/);
    });
  });

  // Sorting Functionality Tests

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

  it('verifies full price order for low to high sort', () => {
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

  // Card Interaction Tests

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
  });

  it('retains cart state when navigating away and back', () => {
    inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    inventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.go('back');
    inventoryPage.getCartBadgeCount().should('contain.text', '1');
  });

  // Product Detail Page Navigation Tests

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

  // Cart Page Navigation Tests

  it('navigates to cart page from header', () => {
    inventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
  });
});
