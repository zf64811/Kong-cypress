class HomePage {
  get workspacesTitle() {
    return cy.get('.workspace-overview-title');
  }
  get workspaceName() {
    return cy.get('[data-testid="workspace-link-default"]');
  }

  get OverviewTab() {
    return cy.get('[data-testid="sidebar-item-overview"]');
  }

  get GatewayServiceTab() {
    return cy.get('[data-testid="sidebar-item-gateway-services"]');
  }
}
export default HomePage;
