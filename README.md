# Web357 Test

## Installation

- Download `web357-candidate-test.zip`
- Go to your Joomla! Backend in `System -> Extensions -> Upload Package File`
- Upload `web357-candidate-test.zip`
- Enjoy the component in `Components -> Web357 Test -> Recipes`

## Changelog

Read [CHANGELOG.md](CHANGELOG.md)

## New Features

### 🚨 New parameter `Serving size` for Recipe
![Serving size parameter for Recipe](./assets/images/01-serving-parameter-field.png)

## Testing

### Installation

To install the necessary dependencies, run:

```bash
npm install
```

### Setting Up the Test Environment

#### Option 1: Docker Test Environment (Recommended)

You can start the Docker test environment by running

```bash
npm run docker:up
```

#### Option 2: Manual Configuration

If you prefer to configure your environment manually, copy the `tests/cypress/cypress.env.json` file to the root folder
and update it with your configuration:

```json
{
  "baseUrl": "http://joomla-installation.local",
  "adminUsername": "joomla",
  "adminPassword": "joomla@password"
}
```

### Running Tests

#### Run Tests via Cypress CLI

To execute the tests using the Cypress CLI, use:

```bash
npm run cypress:cli
```

#### Open Cypress in Interactive Mode

To open Cypress in interactive mode, run:

```bash
npm run cypress:open
```

### Create ZIP Installation

Create package for Joomla!

```bash
npm run build
```
