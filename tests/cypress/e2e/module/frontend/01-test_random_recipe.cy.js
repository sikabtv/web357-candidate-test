describe('Web357Test - Component Module Test', () => {

    /**
     * Before running tests clear installed data of previous tests.
     * For new installations
     */
    before(() => {

        cy.clearDataAndInstallComponent();
        cy.enableAndConfigureRandomRecipeModule();

    });

    /**
     * Login as administrator before each request
     */
    beforeEach(() => {

        cy.doFrontendLogin(Cypress.env('adminUsername'), Cypress.env('adminPassword'), false);

    });

    /**
     * Test Recipe form data are successfully saved
     */
    it('Fill Recipe form and save', () => {
        cy.visit('/index.php/component/web357test/recipeform?layout=edit');

        // fill create Recipe form
        cy.get('[name="jform[title]"]').type('Test Recipe');
        cy.get('[name="jform[description]"]').type('This is a test recipe description');
        cy.get('[name="jform[ingredients]"]').type('Test ingredients text');
        cy.get('[name="jform[cooking_time]"]').type('10');
        cy.get('[name="jform[difficulty]"]').select('medium');
        cy.get('[name="jform[serving_size]"]').select('2-4 servings');
        cy.get('#form-recipe .btn-primary').click();

        // wait for success message
        cy.get('joomla-alert[type="success"]', {timeout: 4000}).should('be.visible');
    });

    /**
     * Check Recipe Module in frontend
     */
    it('Check Recipe Module existence in frontend', () => {

        cy.visit('/');

        cy.get('.mod-web357-random-recipe h3').contains('Test Recipe').should('exist');
        cy.get('.mod-web357-random-recipe .recipe-difficulty .visually-hidden').contains('medium').should('exist');
        cy.get('.mod-web357-random-recipe .recipe-serving-size').contains('2-4 servings').should('exist');
    });

});
