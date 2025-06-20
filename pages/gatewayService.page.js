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

    get gatewayServiceFilter_Button() {
        return cy.get('[data-testid="filter-button"]');
    }

    get filterbyName_Button() {
        return cy.get('.kong-ui-entity-filter-menu > [data-testid="name"] > .menu-item-title');
    }

    get filterbyName_Input() {
        return cy.get('.kong-ui-entity-filter-menu > [data-testid="name"] #filter-name');
    }

    get filterApply_Button() {
        return cy.get('[data-testid="name"] button[data-testid="apply-filter"]');
    }

    get actionButton() {
        return cy.get('[data-testid="actions"] [data-testid="row-actions-dropdown-trigger"]');
    }

    get delete_Button() {
        return cy.get('[data-testid="action-entity-delete"]');
    }

    get confirmDelete_Input() {
        return cy.get('[data-testid="confirmation-input"]');
    }

    get confirmDelete_button() {
        return cy.get('[data-testid="modal-action-button"]');
    }
}
export default GatewayServicePage;
