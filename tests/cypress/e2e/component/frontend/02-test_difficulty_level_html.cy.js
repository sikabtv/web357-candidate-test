describe('Web357Test - Difficulty stars validate', () => {

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

        cy.doFrontendLogin(Cypress.env('adminUsername'), Cypress.env('adminPassword'), false);

    });


    /**
     * Test difficulty stars in frontend and list
     */
    it('Test difficulty stars in frontend and list', () => {
        cy.fixture('enums').then(function (enums) {


            enums.availableDifficulties.forEach((dropdownOption) => {

                /* go to edit page */
                cy.visit('/index.php/component/web357test/recipeform?layout=edit');

                // fill create Recipe form
                let recipeTitle = 'Test Recipe ' + dropdownOption.label;
                cy.get('[name="jform[title]"]').type(recipeTitle);
                cy.get('[name="jform[description]"]').type('This is a test recipe description');
                cy.get('[name="jform[ingredients]"]').type('Test ingredients text');
                cy.get('[name="jform[cooking_time]"]').type('10');
                cy.get('[name="jform[difficulty]"]').select(dropdownOption.value);
                cy.get('[name="jform[serving_size]"]').select('2-4 servings');
                cy.get('#form-recipe .btn-primary').click();

                // wait for success message
                cy.get('joomla-alert[type="success"]', {timeout: 4000}).should('be.visible');

                // validate single page view
                cy.visit('/component/web357test/recipes');

                cy.get('#recipeList tr a').contains(recipeTitle).click();

                // verify the difficulty level has 3 stars
                cy.get('table .recipe-difficulty i.fa-star').should('have.length', dropdownOption.stars);


                // validate to recipes list
                cy.visit('/component/web357test/recipes');
                cy.contains('#recipeList tr', recipeTitle)
                    .should('be.visible')
                    .within(() => {
                        // verify the difficulty level has 3 stars
                        cy.get('.recipe-difficulty i.fa-star').should('have.length', dropdownOption.stars);

                        // click the delete (trash) button
                        cy.get('.icon-trash').parent('a').click();
                    });
            })
        });

    });

});
