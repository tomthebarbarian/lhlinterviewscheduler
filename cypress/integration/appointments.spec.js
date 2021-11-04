describe("Appointments", () => {
  beforeEach(() => {
    cy.request('http://localhost:8001/api/debug/reset')
    cy.visit("/");
    cy.contains("Monday");
  })

  it('should book an interview', () => {
    cy.get("[alt=Add]")
      .first()
      .click()
    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones')
    cy.get("[alt='Sylvia Palmer']")
      .click()
    cy.contains('Save')
      .click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    }
  )

  it('should edit interview', () => {
    cy.visit("/");


    cy.get("article:nth-child(1)")
    cy.get('main > section.appointment__card-right > section > img:nth-child(1)')
      .invoke('show')
      .click()
      .get('input')
      .clear()
      .type('Edit Name')
    cy.get("[alt='Tori Malcolm']").click();
    cy.get('.button--confirm')
      .click()
    cy.contains(".appointment__card--show", "Edit Name");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it('should delete interview', () => {
    cy.visit("/");
    cy.get("[alt=Delete]")
      .click({ force: true });
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })
})