/// <reference types="cypress" />

// cy.login() - Log in using username and password
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

// cy.logout() - Log out by clicking menu > logout
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.url().should('include', '/');
});

// cy.assertInputErrorState() - Validate red input and error icon
Cypress.Commands.add('assertInputErrorState', (selector: string) => {
  cy.get(selector).should('exist').and('have.class', 'input_error');
  cy.get('.error_icon').should('exist');
  cy.get('.error_icon').should('have.length', 2);
});

// cy.assertErrorDismisses() - Validate error disappears after closing
Cypress.Commands.add('assertErrorDismisses', () => {
  cy.get('[data-test="error"]').should('be.visible');
  cy.get('.error-button').click();
  cy.get('[data-test="error"]').should('not.exist');
});
