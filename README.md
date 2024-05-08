# WEBNOVEL APP

## Purpose/Description
App similar to goodreads to save books, novels and documents

## How does it work

- From a **user perspective**: [deploys](https://backend-ewc9.onrender.com)

- From a **developer perspective**:

      npm install
      npm run dev
      https//localhost:3000

## How to contribute

- **Repo/Folder structure**: [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

  - Controllers
  - Middlewares
  - Routes
  - Utils
  - Models

- **Tools**:
  - Javascript
  - Jest
  - HTML
  - CSS
  - Handlebars
  - MongoDB
  - Python
  - Pre-commit
- **Requirements**:
  - Node.js
  - Git
  - Repository permissions (To ask for permissions contact a code owner)

### Contribution Process

- **Commit**:

  - Use of the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Recommended to use the [gitmoji](https://gitmoji.dev/) to make the commits more readable
  - If vs code is used, the [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension is recommended

- **Pull request creation**:
  - To merge something to the branches it is needed to create a pull request and that pull request have to pass all the checks and minimum one review
  - The new created branches needs to be name after the feature that is going to be working in that branch
- **Checks/Tests**:
  - Linter
  - Pre-commit
- **Release process**:

  - Main (Develop): This branch is going to be use for the general development of the project
  - Test: This branch is going to be use for the system test so it enables the merge to production
  - Production: This branch its the main versioning for the main app


