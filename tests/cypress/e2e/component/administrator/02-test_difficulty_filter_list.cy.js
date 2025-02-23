describe('Web357Test - Recipe List Filter By Difficulty Test', () => {

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

        // Load the fixtures
        cy.fixture('enums').then(function (enums) {
            this.enumsJson = enums
        })
    });

    /**
     * Creates and verifies recipes with different difficulty levels
     */
    it('Creates and verifies recipes with different difficulty levels', function () {

        this.enumsJson.availableDifficulties.forEach((dropdownOption) => {

            /* go to edit page */
            cy.visit('/administrator/index.php?option=com_web357test&task=recipe.add');

            // fill create Recipe form
            let recipeTitle = 'Test Recipe ' + dropdownOption.label;
            cy.get('[name="jform[title]"]').type('Recipe');
            cy.get('[name="jform[description]"]').type('This is a test recipe description');
            cy.get('[name="jform[ingredients]"]').type('Test ingredients text');
            cy.get('[name="jform[cooking_time]"]').type('10');
            cy.get('[name="jform[difficulty]"]').select(dropdownOption.value);
            cy.get('[name="jform[serving_size]"]').select('2-4 servings');
            cy.get('.button-apply').click();

            // wait for success message
            cy.get('joomla-alert[type="success"]', {timeout: 4000}).should('be.visible');

            // go to Recipes list
            cy.visit('/administrator/index.php?option=com_web357test');

            // check if values exists one time
            cy.get('table#recipeList tbody tr')
                .contains('td', dropdownOption.label)
                .should('have.length', 1);
        })

    });

    /**
     * Test filter recipes by difficulty
     */
    it('Test filter recipes by difficulty', function () {

        // go to Recipes list
        cy.visit('/administrator/index.php?option=com_web357test');

        this.enumsJson.availableDifficulties.forEach((dropdownOption) => {

            cy.get('.js-stools-btn-filter').click();

            // Select the difficulty filter
            cy.get('[name="filter[difficulty]"]').select(dropdownOption.value);

            // Ensure the list show one result
            cy.get('table#recipeList tbody tr').should('have.length', 1);

            // check if values exists one time
            cy.get('table#recipeList tbody tr')
                .contains('td', dropdownOption.label)
                .should('have.length', 1);

            // Navigate to another page (e.g., Joomla Dashboard)
            cy.visit('/administrator/index.php');

            // Navigate back to the recipe list
            cy.visit('/administrator/index.php?option=com_web357test');

            // Ensure the list show one result
            cy.get('table#recipeList tbody tr').should('have.length', 1);

            // check if values exists one time
            cy.get('table#recipeList tbody tr')
                .contains('td', dropdownOption.label)
                .should('have.length', 1);

            // check filter has correct value
            cy.get('[name="filter[difficulty]"]').should('have.value', dropdownOption.value);


            // Clear the filter
            cy.get('.js-stools-btn-clear').click();

            // Ensure the list reloads to show all recipes
            cy.get('table#recipeList tbody tr').should('have.length', 3);
        });
    });

});
