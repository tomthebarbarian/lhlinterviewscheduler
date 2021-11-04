describe("Appointments", () => {
  beforeEach(() => {
    cy.request('http://localhost:8001/api/debug/reset')
    cy.visit("/");
    cy.contains("Monday");
  })

  it('should book an interview', () => {
    cy.get("[alt=Add]")
      .eq(1)
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


    cy.get("article:nth-child(2)")
      .get('main > section.appointment__card-right > section > img:nth-child(1)')
      .invoke('show')
      .click()
      .get('input')
      .type('Edit Name')
      .get('section.appointment__card-left > section > ul > li:nth-child(1)')
      .click()
      .get('.button--confirm')
      .click()
  })

  // it('should delete interview', () => {
  //   cy.visit("/");
  //   cy.get("article:nth-child(2)")
  //     .get('main > section.appointment__card-right > section > img:nth-child(2)')
  //     .invoke('show')
  //     .click()
  //     .get('section.appointment__actions > button:nth-child(2)')
  //     .click()
  // })
})