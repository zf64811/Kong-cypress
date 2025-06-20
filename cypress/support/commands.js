// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import GatewayServicePage from '../pages/gatewayService.page';
import RoutePage from '../pages/route.page';

const gatewayServicePage = new GatewayServicePage();
const routePage = new RoutePage();

Cypress.Commands.add('workspacesLogin', () => {
    cy.visit('/workspaces');
    cy.url().should('include', '/workspaces');
});

Cypress.Commands.add(
    'addNewgatewayService',
    (gatewayServiceName, gatewayServiceTag, gatewayServiceFullUrl) => {
        gatewayServicePage.clickaddNewgatewayService_Button();
        gatewayServicePage.newgatewayServiceName_Input.type(gatewayServiceName);
        gatewayServicePage.gatewayServiceTags_Input.type(gatewayServiceTag);
        gatewayServicePage.gatewayServiceFullUrl_Input.type(gatewayServiceFullUrl);
        gatewayServicePage.gatewayServiceSave_Button.click();
    }
);
    // routePage.clickaddNewRoute_Button();
Cypress.Commands.add('addRoute', (routeName, serviceName, routeTag, routePath) => {
    routePage.routeName_Input.type(routeName);
    if (serviceName) {
        routePage.routeService_Input.type(serviceName);
        routePage.routeService_dropdown.contains(serviceName).click();
    }
    routePage.routeTags_Input.type(routeTag);
    routePage.routePath_Input.type(routePath);
    routePage.routeSave_Button.click();
});
