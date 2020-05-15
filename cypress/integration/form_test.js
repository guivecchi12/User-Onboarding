describe('Name test', function(){
    it('Get Name and type into it', function(){
        cy.visit("index.html");
        cy.get('#name').type("Gui").should("have.value", "Gui");

        cy.get('input[name="email"]')
        .type("stuck@home.com");

        cy.get('input[name="password"]')
        .type("mypassword1");

        cy.get('#terms')
        .check()
        .should("be.checked");

        cy.get('button').click();

        cy.get('input[name="name"]').clear();
        cy.get('[for="name"] > .error').should("be.visible");
    })
})