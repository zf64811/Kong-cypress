// Regression Test for Kong Manager Add Service and Add Rouite and ADD Upstream
import HomePage from '../../pages/home.page';
import OverViewPage from '../../pages/overview.page';
import GatewayServicePage from '../../pages/gatewayService.page';
import BasePage from '../../pages/base.page';
import RoutePage from '../../pages/route.page';

const gatewayServicePage = new GatewayServicePage();
const homePage = new HomePage();
const overViewPage = new OverViewPage();
const basePage = new BasePage();
const routePage = new RoutePage();

describe('Test Kong Manager GatewayService sociated with other applications', () => {
    let serviceName, gatewayTag, validaApi;
    let workspacesTitle, overViewPageTitle;
    let name, routeTag, path;
    let gatewayServicelistAPI, getrouteListAPI;
    before(() => {
        cy.fixture('regressionData').then(data => {
            ({ serviceName, gatewayTag, validaApi } = data.gatewayService);
            ({ workspacesTitle, overViewPageTitle } = data.contextAssert);
            ({ gatewayServicelistAPI } = data.gatewayAPI);
            ({ name, serviceName, routeTag, path } = data.validRoute);
            ({ getrouteListAPI } = data.routeAPI);
        });
    });

    beforeEach(() => {
        cy.intercept('GET', gatewayServicelistAPI).as('gatewayServicelist');
        cy.intercept('GET', getrouteListAPI).as('getRouteList');
        cy.workspacesLogin();
        homePage.workspacesTitle.should('be.visible').and('contain', workspacesTitle);
        homePage.workspaceName.click();
        overViewPage.OverViewPageTitle.should('be.visible').and('contain', overViewPageTitle);
        homePage.GatewayServiceTab.click();
        cy.wait('@gatewayServicelist');
    });

    afterEach(function () {
        const title = this.currentTest.title;
        const state = this.currentTest.state; // "passed" or "failed"
        cy.screenshot(`${title} -- ${state}`, { capture: 'runner' });
    });

    it('Create a route associated with gatewayservice', () => {
        //create a gateway service
        cy.addNewgatewayService(serviceName, gatewayTag, validaApi);
        cy.wait(500);
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', `Gateway Service "${serviceName}" successfully created!`);
        cy.wait(500);
        gatewayServicePage.addRoute_Button.click();
        //create a route associated with gateway service
        cy.addRoute(name, null, routeTag, path);
        routePage.routePrompt_Message
            .should('be.visible')
            .and('contain', `Route "${name}" successfully created!`);
    });

    it('Should not Delete a gateway service associated with route', () => {
        basePage.filter_Button.click();
        basePage.filterbyName_Button.click();
        basePage.filterbyName_Input.should('be.visible').type(serviceName);
        basePage.filterApply_Button.click();
        cy.wait(1000);
        basePage.actionButton.should('be.visible').click();
        basePage.delete_Button.should('be.visible').click();
        basePage.confirmDelete_Input.should('be.visible').type(serviceName);
        basePage.confirmDelete_Input.should('have.value', serviceName);
        basePage.confirmDelete_button.should('be.visible').click();
        gatewayServicePage.gatewaydeleteAlert_Message
            .should('be.visible')
            .and('contain', `an existing 'routes' entity references this 'services' entity`);
    });

    it('Delete Route before Delete the gateway service', () => {
        homePage.RouteTab.click();
        cy.wait('@getRouteList');
        basePage.filter_Button.click();
        basePage.filterbyName_Button.click();
        basePage.filterbyName_Input.should('be.visible').type(name);
        basePage.filterApply_Button.click();
        cy.wait(1000);
        basePage.actionButton.should('be.visible').click();
        basePage.delete_Button.should('be.visible').click();
        basePage.confirmDelete_Input.should('be.visible').type(name);
        basePage.confirmDelete_Input.should('have.value', name);
        basePage.confirmDelete_button.should('be.visible').click();
        routePage.routePrompt_Message
            .should('be.visible')
            .and('contain', `Route "${name}" successfully deleted!`);
        homePage.GatewayServiceTab.click();
        cy.wait('@gatewayServicelist');
        basePage.filter_Button.click();
        basePage.filterbyName_Button.click();
        basePage.filterbyName_Input.should('be.visible').type(serviceName);
        basePage.filterApply_Button.click();
        cy.wait(1000);
        basePage.actionButton.should('be.visible').click();
        basePage.delete_Button.should('be.visible').click();
        basePage.confirmDelete_Input.should('be.visible').type(serviceName);
        basePage.confirmDelete_Input.should('have.value', serviceName);
        basePage.confirmDelete_button.should('be.visible').click();
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', `Gateway Service "${serviceName}" successfully deleted!`);
    });
});
