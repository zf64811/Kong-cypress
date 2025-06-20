// only for demo API test
describe('workspace list API', () => {
    it('should GET workspace list', () => {
        cy.request(
            'GET',
            'http://localhost:8001/workspaces?size=15&sort_by=created_at&name=default&counter=true'
        )
            .its('status')
            .should('eq', 200);
    });
});
