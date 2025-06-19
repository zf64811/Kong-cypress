import HomePage from '../../../pages/home.page';
import OverViewPage from '../../../pages/overview.page';
import GatewayServicePage from '../../../pages/gatewayService.page';

const gatewayServicePage = new GatewayServicePage();
const homePage = new HomePage();
const overViewPage = new OverViewPage();

describe('Test Add GatewayService', () => {
    let getGatewayServicelistAPI;
    let serviceName, tag, invalidApi, validaApi;
    before(() => {
        cy.fixture('gatewayData').then(data => {
            ({ serviceName, tag, invalidApi, validaApi } = data.gatewayService);
            ({ getGatewayServicelistAPI } = data.gatewayAPI);
        });
    });

    beforeEach(() => {
        cy.intercept('GET', getGatewayServicelistAPI).as('getGatewayServicelist');
        cy.workspacesLogin();
        homePage.workspacesTitle.should('be.visible').and('contain', ' Workspaces ');
        homePage.workspaceName.click();
        overViewPage.OverViewPageTitle.should('be.visible').and('contain', 'Overview');
    });

    it('Url should be vaild when add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService(serviceName, tag, invalidApi);
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', "Failed to construct 'URL': Invalid URL");
    });

    it('Add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService(serviceName, tag, validaApi);
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', `Gateway Service "${serviceName}" successfully created!`);
        cy.wait(1000);
    });

    it('gatewayService name should be unique when add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService(serviceName, tag, validaApi);
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', `UNIQUE violation detected on '{name="${serviceName}"}'`);
    });

});
