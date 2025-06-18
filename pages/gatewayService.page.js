class GatewayServicePage {
  get addNewgatewayService_Button() {
    return cy.get('[data-testid="empty-state-action"]');
  }
  get newgatewayServiceName_Input() {
    return cy.get('[data-testid="gateway-service-name-input"');
  }
}
export default GatewayServicePage;
