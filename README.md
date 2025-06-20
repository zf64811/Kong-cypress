# Cypress E2E Testing for Kong Gateway

This project provides an automated end-to-end (E2E) testing suite for the [Kong Gateway](https://docs.konghq.com/gateway/latest/), built using [Cypress](https://www.cypress.io/). It uses the Page Object Model (POM) for maintainability, integrates the `cypress-mochawesome-reporter` for beautiful HTML test reports, and is powered by GitHub Actions for CI/CD with test results published via GitHub Pages. You can See test report in https://zf64811.github.io/Kong-cypress/ 
The cypress/e2e/ folder is organized by test types and purposes:
Folder	     Purpose
api/	     Contains API-level test cases written using cy.request() for backend validation without UI interaction.
ui/	         Contains UI test cases for individual pages or components (e.g., Gateway Service, Routes), written using the Page Object Model (POM).
regression/	 Contains full regression test cases across multiple integrated features or flows (e.g., end-to-end workflows across pages). These simulate real user journeys.

🧠 Tip: Grouping tests this way improves maintainability and makes it easier to scale UI and API automation separately.

⚙️ Technical Design Decision: Cypress vs. Cucumber
Initially, I considered integrating Cypress with Cucumber to support a BDD-style test suite. However, after further analysis, I decided not to include Cucumber for the following reasons:
The current Cypress structure, combined with command abstraction and the Page Object Model, already provides clear and maintainable test cases.
Adding Cucumber would introduce additional configuration and maintenance overhead.
For the scope and goals of this project, BDD would offer limited value while potentially reducing overall development efficiency.
As a result, I chose to stick with Cypress’s native syntax to keep things simple, efficient, and easy to maintain.

## 🌟 Features

-   ✅ **E2E testing** of Kong Gateway UI
-   📄 **Page Object Model** for reusable and scalable test structure
-   📊 **Mochawesome HTML Reports** generated with `cypress-mochawesome-reporter`
-   🔁 **GitHub Actions CI/CD** to automate test runs on every push
-   🌐 **GitHub Pages** to view the latest test reports online

## 📁 Project Structure

KONG-CYPRESS/
├── .github/                     # GitHub workflows (CI/CD)
├── .vscode/                     # VSCode editor settings
├── cypress/
│   ├── downloads/               # Downloaded files (if any)
│   ├── e2e/                     # Cypress test cases (UI + API + Regression)
│   ├── fixtures/                # Mock/test data JSON files
│   ├── pages/                   # Page Object files
│   ├── reports/                 # Cypress Mochawesome test reports (HTML/JSON)
│   ├── screenshots/             # Screenshots after each test
│   ├── support/                 # Custom commands and setup (e.g. commands.js)
│   └── videos/                  # Test run video recordings
├── node_modules/                # Installed npm dependencies (git-ignored)
├── .gitignore                   # Files/folders to ignore by Git
├── .prettierrc / .prettierignore# Prettier config for formatting
├── cypress.config.js            # Cypress configuration
├── docker-compose.yml           # Docker setup for local environment
├── package.json                 # Project metadata and npm scripts
├── package-lock.json            # Exact dependency versions
└── README.md                    # Project overview and usage instructions

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

## 🧪 Run Tests Locally
```bash
npx cypress run
```

## 📊 View Test Report (Optional)

reports/index.html


## 🔁 GitHub Actions CI/CD

```
On each push to the main branch, GitHub Actions will:
Install dependencies
Run Cypress tests
Generate Mochawesome HTML report
Publish the report to GitHub Pages at:
👉 https://zf64811.github.io/Kong-cypress/
```

📁  Page Object Model (cypress/pages)
All page-related locators and actions are stored in the cypress/pages folder.
Each page/component has its own .page.js file.
✅ Best Practice:
Shared/common UI elements (e.g., submit buttons, toasts) are placed in basepage.page.js, which can be extended by other pages.

🧾 Test Data Management (cypress/fixtures)
Reusable test data is stored in JSON files inside the cypress/fixtures folder.
Data is loaded via cy.fixture() in before() hooks.

🛠 Reusable Commands (cypress/support)
The cypress/support/commands.js file contains custom reusable functions (like login, addRoute).
Hooks like beforeEach, afterEach are used to DRY the tests and ensure setup/teardown consistency.

📸 Screenshots on Every Test (afterEach)
To capture visual evidence for every test (not just failures), an automatic screenshot is taken after each it() block using the test name.