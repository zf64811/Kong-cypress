class GatewayServicePage {
    clickaddNewgatewayService_Button() {
        cy.get('.services-listing').then($body => {
            if ($body.find('[data-testid="filter-button"]').length > 0) {
                cy.get('[data-testid="toolbar-add-gateway-service"]').click();
            } else {
                cy.get('[data-testid="empty-state-action"]').click();
            }
        });
    }
    get newgatewayServiceName_Input() {
        return cy.get('[data-testid="gateway-service-name-input"');
    }
    get gatewayServiceTags_Input() {
        return cy.get('[data-testid="gateway-service-tags-input"]');
    }
    get gatewayServiceFullUrl_Input() {
        return cy.get('[data-testid="gateway-service-url-input"]');
    }
    get gatewayServiceProtocol_Radio() {
        return cy.get('[data-testid="gateway-service-protocol-radio"]');
    }
    get gatewayServiceSave_Button() {
        return cy.get('[data-testid="service-create-form-submit"]');
    }
    get gatewayServiceAlert_Message() {
        return cy.get('.alert-message > p');
    }
    get gatewayServicePrompt_Message() {
        return cy.get('.toaster-message');
    }
}
export default GatewayServicePage;
