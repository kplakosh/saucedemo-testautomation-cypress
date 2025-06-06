declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>
    logout(): Chainable<void>
    assertInputErrorState(selector: string): Chainable<void>
    assertErrorDismisses(): Chainable<void>
  }
}