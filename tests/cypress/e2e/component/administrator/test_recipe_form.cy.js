describe('Web357Test - Recipe Form Tests', () => {

    /**
     * Before running tests clear installed data of previous tests.
     * For new installations
     */
    before(() => {

        cy.clearDataAndInstallComponent();

    });


    /**
     * Login as administrator before each request
     */
    beforeEach(() => {

        cy.doAdministratorLogin(Cypress.env('adminUsername'), Cypress.env('adminPassword'), false);

    });


    /**
     * Check Serving size options dropdown existence and values
     */
    it('Check Serving size dropdown existence and values', () => {
        cy.visit('/administrator/index.php?option=com_web357test&task=recipe.add');

        const dropdownSelector = '[name="jform[serving_size]"]';

        cy.get(dropdownSelector).should('exist');

        // Available Serving size options
        const values = [
            {
                value: '10',
                label: '1-2 servings'
            },
            {
                value: '20',
                label: '2-4 servings'
            },
            {
                value: '30',
                label: '4-6 servings'
            },
            {
                value: '40',
                label: '6-8 servings'
            },
            {
                value: '50',
                label: '8+ servings'
            },
        ];

        values.forEach((dropdownOption) => {

            // Select the value from the dropdown based on label
            cy.get(dropdownSelector).select(dropdownOption.label);

            // Verify the selected value
            cy.get(dropdownSelector).should('have.value', dropdownOption.value);
        })

    });


    /**
     * Test Recipe form data are successfully saved
     */
    it('Fill Recipe form and save', () => {
        cy.visit('/administrator/index.php?option=com_web357test&task=recipe.add');

        // fill create Recipe form
        cy.get('[name="jform[title]"]').type('Test Recipe');
        cy.get('[name="jform[description]"]').type('This is a test recipe description');
        cy.get('[name="jform[ingredients]"]').type('Test ingredients text');
        cy.get('[name="jform[cooking_time]"]').type('10');
        cy.get('[name="jform[difficulty]"]').select('medium');
        cy.get('[name="jform[serving_size]"]').select('2-4 servings');
        cy.get('.button-apply').click();

        // wait for success message
        cy.get('joomla-alert[type="success"]', {timeout: 4000}).should('be.visible');
    });

    /**
     * Test Recipe form data are correctly stored
     */
    it('Should check if form values are stored correctly', () => {
        cy.visit('/administrator/index.php?option=com_web357test');

        cy.get('a').contains('Test Recipe').click();

        // Check if saved values are correct
        cy.get('[name="jform[title]"]').should('have.value', 'Test Recipe');
        cy.get('[name="jform[description]"]').should('have.value', 'This is a test recipe description');
        cy.get('[name="jform[ingredients]"]').should('have.value', 'Test ingredients text');
        cy.get('[name="jform[cooking_time]"]').should('have.value', '10');
        cy.get('[name="jform[difficulty]"]').should('have.value', 'medium');
        cy.get('[name="jform[serving_size]"]').should('have.value', '20');
    });
});
