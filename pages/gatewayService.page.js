class GatewayServicePage {
  get addNewgatewayService_Button() {
    return cy.get('[data-testid="toolbar-add-gateway-service"]');
  }
  get newgatewayServiceName_Input() {
    return cy.get('[data-testid="gateway-service-name-input"');
  }
}
export default GatewayServicePage;
