import { InventoryPage } from '../pages/InventoryPage';

const inventoryPage = new InventoryPage();

describe('Visual User - Inventory Page UI Tests', () => {
  beforeEach(() => {
    cy.login('visual_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
  });

  // === Core Functional Validations (Baseline) ===

  it('displays all 6 inventory items', () => {
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('displays product name, price, image, and button for each product', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
      cy.wrap($el).find('.inventory_item_price').should('be.visible');
      cy.wrap($el).find('img').should('be.visible');
      cy.wrap($el).find('button').should('be.visible');
    });
  });

  // === Visual Regression Checks ===

  it('product images should not be broken', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('img')
        .should('have.attr', 'src')
        .and('not.contain', 'sl-404')
        .and('not.contain', 'broken');
    });
  });

  it('inventory items are aligned in grid layout', () => {
    inventoryPage.getAllInventoryItems().should('have.css', 'display', 'flex');
  });

  it('Add to cart buttons have consistent style and text', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el)
        .find('button')
        .should('have.class', 'btn')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.match(/^(Add to cart|Remove)$/);
        });
    });
  });

  it('product title font size is consistent', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_name')
        .should('have.css', 'font-size', '20px');
    });
  });

  it('product description does not overflow container', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_desc')
        .should('have.css', 'overflow')
        .and('not.eq', 'visible');
    });
  });

  // === Layout, Alignment, and Visual Fidelity ===

  it('displays all product images with consistent size on desktop', () => {
    cy.viewport(1280, 800);
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('img')
        .should('be.visible')
        .should('have.css', 'width', '100px')
        .should('have.css', 'height', '100px');
    });
  });

  it('displays all product images with responsive size on mobile', () => {
    cy.viewport('iphone-6');
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('img')
        .should('be.visible')
        .and('have.css', 'width')
        .and('have.css', 'height');
    });
  });

  it('each product description is not empty and contains meaningful text', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_desc')
        .invoke('text')
        .should('match', /\w{5,}/);
    });
  });

  it('displays the correct image for each product', () => {
    const expectedImages = [
        { name: 'Sauce Labs Backpack', src: 'sauce-backpack' },
        { name: 'Sauce Labs Bike Light', src: 'bike-light' },
        { name: 'Sauce Labs Bolt T-Shirt', src: 'bolt-shirt' },
        { name: 'Sauce Labs Fleece Jacket', src: 'fleece-jacket' },
        { name: 'Sauce Labs Onesie', src: 'onesie' },
        { name: 'Test.allTheThings() T-Shirt (Red)', src: 'red-shirt' }
    ];

    expectedImages.forEach(({ name, src }) => {
        inventoryPage.getItemByName(name)
        .find('img')
        .should('have.attr', 'src')
        .and('include', src);
    });
    });

  it('ensures product titles are left-aligned', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('.inventory_item_name')
        .should('have.css', 'text-align', 'left');
    });
  });

  it('ensures Add/Remove buttons are consistently aligned', () => {
    inventoryPage.getAllInventoryItems().each(($el) => {
      cy.wrap($el).find('button')
        .should('have.css', 'position')
        .and('not.eq', 'absolute');

      cy.wrap($el).find('button').then(($btn) => {
        const { left } = $btn[0].getBoundingClientRect();
        expect(left).to.be.greaterThan(200); // adjust threshold as needed
      });
    });
  });

  // === Cross-Viewport Testing ===

  it('renders correctly on mobile viewport (iPhone)', () => {
    cy.viewport('iphone-6');
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('renders correctly on tablet viewport (iPad)', () => {
    cy.viewport('ipad-2');
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('renders correctly on desktop viewport', () => {
    cy.viewport(1280, 800);
    inventoryPage.getAllInventoryItems().should('have.length', 6);
  });

  it('cart icon is consistently positioned in header across viewports', () => {
    const checkPosition = () => {
        cy.get('.shopping_cart_link').then(($icon) => {
        const rect = $icon[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(100);     // Near top
        expect(rect.right).to.be.greaterThan(900); // Right-aligned on desktop
        });
    };

    // Desktop
    cy.viewport(1280, 800);
    cy.login('visual_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
    checkPosition();

    // Mobile
    cy.viewport('iphone-6');
    cy.login('visual_user', 'secret_sauce');
    inventoryPage.verifyOnInventoryPage();
    cy.get('.shopping_cart_link').then(($icon) => {
        const rect = $icon[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(100);
        expect(rect.right).to.be.greaterThan(300); // Tolerant for mobile right-edge
    });
  });

  // === Sorting & Button State ===

  it('sort dropdown is visible and styled correctly', () => {
    cy.get('[data-test="product-sort-container"]')
      .should('be.visible')
      .and('have.css', 'background-color')
      .and('match', /rgb|#/);
  });

  it('add/remove buttons maintain state visually', () => {
    const product = 'Sauce Labs Backpack';
    inventoryPage.addItemToCartByName(product);
    inventoryPage.getItemButtonByName(product).should('have.text', 'Remove');

    inventoryPage.removeItemFromCartByName(product);
    inventoryPage.getItemButtonByName(product).should('have.text', 'Add to cart');
  });
});