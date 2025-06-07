export class LoginPage {
  visit() {
    cy.visit('https://www.saucedemo.com/');
  }

  enterUsername(username: string) {
    cy.get('[data-test="username"]').clear().type(username);
  }

  enterPassword(password: string) {
    cy.get('[data-test="password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('[data-test="login-button"]').click();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }

  assertErrorMessageContains(message: string) {
    this.getErrorMessage().should('contain.text', message);
  }
}
