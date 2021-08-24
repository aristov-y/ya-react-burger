describe('Constructor page', () => {
  before(() => {
    cy.visit('http://localhost:3000')
      .clearCookie('token')
      .clearLocalStorage('token');
  });
  it('should add ingredient', () => {
    cy.get('[data-cy="bun"] > .text').first().click();

    cy.contains('(верх)')
    cy.contains('(низ)')
  });
  it('click order', () => {
    cy.get('[data-cy="checkout-block"] button').click();

    cy.contains('Вход')
    cy.contains('Войти')
  })
})
