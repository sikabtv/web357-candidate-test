const {defineConfig} = require('cypress');
const fs = require('fs');


const envConfig = fs.existsSync('../../cypress.env.json') ? require('../../cypress.env.json') : require('../cypress/cypress.env.json');
module.exports = defineConfig({
    e2e: {
        baseUrl: envConfig.baseUrl,
        specPattern: 'tests/cypress/**/*.cy.{js,ts}',
        supportFile: 'tests/cypress/support/e2e.js',
        fixturesFolder: 'tests/cypress/fixtures',
        videosFolder: 'tests/cypress/output/videos',
        screenshotsFolder: 'tests/cypress/output/screenshots',
        video: false,
        viewportWidth: 1280,
        viewportHeight: 800,
        env: envConfig,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
