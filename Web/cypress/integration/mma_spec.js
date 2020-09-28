
Cypress.on('uncaught:exception', (err, runnable) => {
	debugger
    return false;
});
Cypress.on('window:before:load', (win) => {	
	debugger
	delete win.fetch	
  })
  var fn = {
	Login(){
		cy.visit('https://mma.sinopac.com/MemberPortal/Member/MMALogin.aspx');
		cy.get('.rowElem:eq(0) input')
			.type('e122085379');
		cy.get('.rowElem:eq(1) input')
			.type('thony1');
		cy.get('.rowElem:eq(2) input')
			.type('EL1904');
		//.focus();
		cy.get('.rowElem:eq(3) input')
			.focus();
		cy.wait(60*1000);
		cy.get(".xxxxx", );
		// cy.get('#Account').type('admin'); 
		// cy.get('#Password').type('gtimes135');
		// cy.get('.btn').click();
			//.focus();
	},
	T03(){
		fn.Login();
		// cy.get(':nth-child(1) > :nth-child(3) > [data-toggle="collapse"] > span', { timeout: 10*1000 })
		// cy.visit('http://118.163.52.55/GenesisNewMes/WIP/Test01/single?name=case1');
		// cy.get('#app > button')
		// 	.click()
		// 	.click();
		// cy.get('#app > :nth-child(1)')
		// 	.contains('counts:2')
		// cy.get('#app > :nth-child(1)')
		// 	.should('have.text','counts:2');
			//.invoke("text")
			// .should(($el)=>{
			// 	expect($el.text()).to.eq('counts:2');
			// });
	}
}
describe('My First Test', function() {
	it('開啟頁面', fn.Login)
  })

