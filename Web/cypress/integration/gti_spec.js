
Cypress.on('uncaught:exception', (err, runnable) => {
	debugger
    return false;
});
Cypress.on('window:before:load', (win) => {	
	debugger
	delete win.fetch	
  })
describe('My First Test', function() {
	it('開啟頁面', function() {
	  cy.visit('http://118.163.52.55/GenesisNewMes');
	  
	  //cy.get('.navbar-nav a:eq(0)').click();
	  
	 //cy.get('a[title=登入系統]').click();
	 cy.get('#user-block-toggle').click();
	 cy.contains('button','立即登入').click();
	})
  })