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

- Product listing structure validation
- Add/remove to cart workflows
- Cart badge updates
- Sorting by name and price (including sort verification)
- Product detail navigation via name and image
- Layout responsiveness (e.g., iPhone view)

### Product Detail Page

- Product name, price, description verification
- "Add to Cart" interaction from detail page

### Cart Page

- Cart state persistence
- Navigation and item validation (upcoming)

---

## Folder Structure

<pre lang="markdown"> <code> ```text saucedemo-testautomation-cypress/ ├── cypress/ │ ├── e2e/ # Test specs │ │ ├── login.cy.ts │ │ └── inventory-standard-user.cy.ts │ ├── fixtures/ # Test data (users.json) │ ├── pages/ # Page Object Models │ │ └── InventoryPage.ts │ └── support/ # Custom commands + setup │ ├── commands.ts │ ├── e2e.ts │ └── index.d.ts ├── tsconfig.json ├── cypress.config.ts ├── package.json └── README.md ``` </code> </pre>

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
