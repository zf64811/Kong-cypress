// CommonElements
// This file contains common elements used across different pages in the application.
class BasePage {
    get filter_Button() {
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

export default BasePage;
