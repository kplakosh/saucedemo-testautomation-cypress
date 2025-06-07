import { LoginPage } from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('SauceDemo - Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('logs in with valid credentials as a standard user', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    cy.logout();
  });

  it('shows error for invalid password', () => {
    cy.login('standard_user', 'wrong_password');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface');
    cy.assertInputErrorState('[data-test="username"]');
    cy.assertInputErrorState('[data-test="password"]');
    cy.assertErrorDismisses();
  });

  it('fails login with locked out user', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.');
    cy.assertInputErrorState('[data-test="username"]');
    cy.assertInputErrorState('[data-test="password"]');
    cy.assertErrorDismisses();
  });

  it('logs in successfully as problem_user (UI issues expected)', () => {
    cy.login('problem_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    // Add UI-specific validations later
    cy.logout();
  });

  it('logs in successfully as performance_glitch_user (may delay)', () => {
    cy.login('performance_glitch_user', 'secret_sauce');
    cy.url({ timeout: 10000 }).should('include', '/inventory.html');
    cy.logout();
  });

  it('logs in successfully as error_user (used for error-handling tests)', () => {
    cy.login('error_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    // Add error-handling assertions for broken backends later
    cy.logout();
  });

  it('logs in successfully as visual_user (for visual testing)', () => {
    cy.login('visual_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    // Add UI validation like broken images or mismatches later
    cy.logout();
  });

  it('shows error when username is missing', () => {
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    loginPage.assertErrorMessageContains('Username is required');
    cy.assertInputErrorState('[data-test="username"]');
    cy.assertInputErrorState('[data-test="password"]');
    cy.assertErrorDismisses();
  });

  it('shows error when password is missing', () => {
    loginPage.enterUsername('standard_user');
    loginPage.clickLogin();

    loginPage.assertErrorMessageContains('Password is required');
    cy.assertInputErrorState('[data-test="username"]');
    cy.assertInputErrorState('[data-test="password"]');
    cy.assertErrorDismisses();
  });

  it('shows error when both username and password are missing', () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
    cy.assertInputErrorState('[data-test="username"]');
    cy.assertInputErrorState('[data-test="password"]');
    cy.assertErrorDismisses();
  });

  it('clears error message after clicking close button', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.assertErrorDismisses();
  });
});
