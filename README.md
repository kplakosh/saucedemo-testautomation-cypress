# SauceDemo Cypress Test Automation Framework

A professional-grade Cypress + TypeScript test automation framework built for [SauceDemo](https://www.saucedemo.com).  
Designed to showcase scalable test architecture, complete end-to-end workflows, and reusable design patterns.

---

## Tech Stack

- Cypress (E2E Testing Framework)
- TypeScript (typed test development)
- Page Object Model (modular test structure)
- Fixtures for test data
- Custom Cypress commands
- Prettier (automated code formatting)
- ESLint (Flat Config with TypeScript and Cypress plugin support)

---

## Test Coverage

This framework covers the following areas of the SauceDemo web app:

### Login Page

- Valid login for all 6 user roles
- Invalid credentials and missing field validations
- Visual assertions (input borders, error icons, dismissals)
- Reusable login and logout commands

### Inventory Page

- Product listing validation (name, price, image, button)
- Cart interactions (add, remove, badge updates)
- Sorting logic (A–Z, Z–A, low-to-high, high-to-low)
- Full sort order verification
- Product detail navigation (name and image click-through)
- Button state toggling (Add ↔ Remove)
- Cart persistence after navigation
- Viewport responsiveness: iPhone 6, iPad, desktop
- Layout validations for `visual_user`:
  - Image sizing (mobile & desktop)
  - Font consistency
  - Button alignment & styling
  - Product description overflow
  - Empty cart icon position
  - Correct image shown per item

### Role-Based Testing
- `standard_user`: Full user journey and expected to pass all tests
- `locked_out_user`: Blocked at login, access denied
- `problem_user`: UI or functional issues expected — tracked per test
- `performance_glitch_user`: Performance timing issues (delayed loading)
- `error_user`: Application-level errors, runtime failures
- `visual_user`: Visual bugs, CSS layout issues across pages

### Cart Page

- Cart state persistence
- Navigation and item validation (upcoming)

---

## How to Run the Tests

### 1. Install dependencies

npm install 

### 2. Open Cypress Test Runner

npx cypress open 

### 3. Run tests headlessly

npx cypress run

## Custom Commands

cy.login(username, password)
cy.logout()
cy.assertInputErrorState(selector)
cy.assertErrorDismisses()

---

## Linting and Formatting

This project uses both **ESLint** and **Prettier** to ensure clean, consistent code.

### Lint all TypeScript files

npm run lint

ESLint uses the Flat Config format (introduced in v9+), with recommended rules from TypeScript, Cypress, and Prettier. It helps catch common issues like unused variables and bad patterns early.

### Format code with Prettier

npm run format

Prettier is used for automatic formatting on save (if supported by your editor) or via command-line to enforce consistent style.
Both tools are pre-configured and ready to run as part of your local workflow or future CI pipeline.

---

## Future Enhancements

Full cart and checkout flow tests
Visual regression testing (optional)
Allure or Mochawesome reporting
GitHub Actions CI integration
Test tags and filtering (@smoke, @regression)

---

## Contributing

This project is built as a personal showcase, but collaboration is welcome. Feel free to fork, suggest improvements, or use it as a base for your own framework.

---

## License

MIT License

---

## Contact

Developed by [Kateryna Plakosh] (https://github.com/kplakosh)  
Connect with me on [LinkedIn] (https://www.linkedin.com/in/katerynaplakosh/)