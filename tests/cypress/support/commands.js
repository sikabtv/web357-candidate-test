// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Register Joomla Cypress custom commands from npm module 'joomla-cypress'


/**
 * Uninstall extension by name if exists
 * @param extensionName
 */
const uninstallExtension = (extensionName) => {
    cy.log('**Uninstall an extension**')
    cy.log('Extension Name: ' + extensionName)

    cy.visit('/administrator/index.php?option=com_installer&view=manage')

    cy.searchForItem(extensionName)


    // Delete the extension
    cy.get('body').then(($body) => {
        if ($body.find('#system-message-container .alert').length === 0 && $body.find('#cb0').length > 0) {
            cy.get('#cb0').click()
            if ($body.find('button.button-delete.btn.btn-danger').length > 0) {
                // Joomla 4: Click on the 'Uninstall' button directly
                cy.clickToolbarButton('delete');
            } else {
                // Joomla >= 5: First open the 'Actions' menu
                cy.get('button.button-status-group.btn.btn-action.dropdown-toggle').click();
                // Second click on the 'Uninstall' button
                cy.get('button.button-delete.dropdown-item').click();
                // Third click on the 'Yes' button to confirm
                cy.get('div.joomla-dialog-container')
                    .find('button.button.button-primary.btn.btn-primary[data-button-ok]')
                    .click();
            }
        }
    })
}

Cypress.Commands.add('uninstallExtensionIfExist', uninstallExtension)


/**
 * Cancel Tour if Exists
 */
Cypress.Commands.add('cancelTourIfExists', () => {
    const disableTourSelector = '.shepherd-enabled .shepherd-button-secondary';
    if (Cypress.$(disableTourSelector).length) {
        cy.get(disableTourSelector).click();
    }
    cy.log('--Cancel Tour--')
})

/**
 * Disable Statistics if Exists
 */
Cypress.Commands.add('disableStatisticsIfExists', () => {
    const disableButtonSelector = '.js-pstats-btn-allow-never'
    if (Cypress.$(disableButtonSelector).length > 0) {
        cy.get(disableButtonSelector).click();
    }
    cy.log('--Disable Statistics--')
})


/**
 * Before running tests clear installed data of previous tests.
 * For new installations, tour and statistics should be disabled.
 */
Cypress.Commands.add('clearDataAndInstallComponent', () => {
    cy.doAdministratorLogin(Cypress.env('adminUsername'), Cypress.env('adminPassword'), false);

    cy.wait(1700)

    // cancel tour
    cy.cancelTourIfExists()

    // disable statistics if exists
    cy.disableStatisticsIfExists()


    // uninstall if component is installed
    cy.uninstallExtensionIfExist('Web357 Test')

    // install component
    cy.installExtensionFromFileUpload('../../../web357-candidate-test.zip');

    cy.doAdministratorLogout()
})

