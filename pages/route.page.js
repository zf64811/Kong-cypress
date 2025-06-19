class RoutePage {
    clickaddNewRoute_Button() {
        cy.get('.routes-listing').then($body => {
            if ($body.find('[data-testid="filter-button"]').length > 0) {
                cy.get('[data-testid="toolbar-add-route"]').click();
            } else {
                cy.get('[data-testid="empty-state-action"]').click();
            }
        });
    }
    get routeName_Input() {
        return cy.get('[data-testid="route-form-name"]');
    }

    get routeService_Input() {
        return cy.get('[data-testid="route-form-service-id"]');
    }

    get routeService_dropdown() {
        return cy.get('.select-item-container > button > span span.select-item-label');
    }

    get routeTags_Input() {
        return cy.get('[data-testid="route-form-tags"]');
    }

    get routePath_Input() {
        return cy.get('[data-testid="route-form-paths-input-1"]');
    }

    get routeSave_Button() {
        return cy.get('[data-testid="route-create-form-submit"]');
    }

    get routePrompt_Message() {
        return cy.get('.toaster-message');
    }

    get routeAlert_Message() {
        return cy.get('.alert-message > p');
    }
}

export default RoutePage;
