
Cypress.on('uncaught:exception', (err, runnable) => {
	debugger
    return false;
});
Cypress.on('window:before:load', (win) => {	
	debugger
	delete win.fetch	
  })
  var fn = {
	T01(){
		cy.visit('http://118.163.52.55/GenesisNewMes');
		//cy.get('.navbar-nav a:eq(0)').click();
		
		//cy.get('a[title=登入系統]').click();
		cy.get('#user-block-toggle').click();
		//cy.contains('button','立即登入')
		cy.get('.swal2-confirm').click();
	},
	Login(){
		cy.visit('http://118.163.52.55/GenesisNewMes/pages/Login');
		cy.get('#Account').type('admin'); 
		cy.get('#Password').type('gtimes135');
		cy.get('.btn').click();
			//.focus();
	},
	T03(){
		fn.Login();
		cy.get(':nth-child(1) > :nth-child(3) > [data-toggle="collapse"] > span', { timeout: 10*1000 })
		cy.visit('http://118.163.52.55/GenesisNewMes/WIP/Test01/single?name=case1');
		cy.get('#app > button')
			.click()
			.click();
		cy.get('#app > :nth-child(1)')
			.contains('counts:2')
		// cy.get('#app > :nth-child(1)')
		// 	.should('have.text','counts:2');
			//.invoke("text")
			// .should(($el)=>{
			// 	expect($el.text()).to.eq('counts:2');
			// });
	}
}
describe('My First Test', function() {
	it('開啟頁面', fn.T03)
  })

