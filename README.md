# Project Name

This project is built with Create React App (CRA) and includes configurations for linting with ESLint and code formatting with Prettier.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. The recommended version is the latest LTS version.
- **Yarn**: This project uses Yarn as the package manager. You can install it globally using npm:

  ```bash
  npm install -g yarn
  ```

## Setup

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/wasif-farooq/mini-todo-fe.git
   cd mini-todo-fe
   ```

2. **Install dependencies**:

   Install the required packages using Yarn:

   ```bash
   yarn install
   ```

3. **Create an `.env` file**:

   Create a `.env` file in the root of your project and add the required environment variables as described in the [Environment Variables](#environment-variables) section.

4. **Run the project**:

   Start the development server:

   ```bash
   yarn start
   ```

## Available Scripts

In the project directory, you can run the following scripts:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn eject`

**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `yarn lint`

Runs ESLint to analyze your code for potential errors and style issues based on the defined rules. This command checks all `.js` and `.jsx` files in the `src` directory, excluding test files.

### `yarn lint --fix`

Automatically fixes ESLint errors and warnings in your code. It runs the `yarn lint` command with the `--fix` flag.

### `yarn prettier:fix`

Formats all the code in the `src` directory according to the Prettier configuration.

### `yarn prettier:check`

Checks if the code in the `src` directory is formatted according to the Prettier configuration.

### `yarn fix`

Runs both `yarn lint --fix` and `yarn prettier:fix` to automatically fix and format your code.

## Environment Variables

To run the project, you need to set up some environment variables. Create a `.env.local` file in the root directory and add the following variables:

```bash
REACT_APP_API_BASE_URL=http://localhost/api
REACT_APP_MOCK_BASE_URL=http://localhost/api
REACT_APP_MOCK_ENABLED=false
```

You can adjust these variables according to your development or production environment needs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
