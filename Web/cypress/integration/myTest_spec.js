describe('My First Test', function() {
	it('Does not do much!', function() {
	  expect(true).to.equal(true)
	})
  })

  describe('My First Test', function() {
	it('Does not do much!', function() {
	  expect(true).to.equal(false)
	})
  })

  describe('My First Test', function() {
	it('Visits the Kitchen Sink', function() {
	  cy.visit('tw.yahoo.com');
	  cy.contains('a[href=https://tw.news.yahoo.com/',"新聞").click();
	})
  })