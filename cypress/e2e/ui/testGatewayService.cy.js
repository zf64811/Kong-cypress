import HomePage from '../../../pages/home.page';
import OverViewPage from '../../../pages/overview.page';
import GatewayServicePage from '../../../pages/gatewayService.page';

const gatewayServicePage = new GatewayServicePage();
const homePage = new HomePage();
const overViewPage = new OverViewPage();

describe('Test Add GatewayService', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8001/default/services?sort_desc=1&size=30').as(
            'getGatewayServicelist'
        );
        cy.workspacesLogin();
        homePage.workspacesTitle.should('be.visible').and('contain', ' Workspaces ');
        homePage.workspaceName.click();
        overViewPage.OverViewPageTitle.should('be.visible').and('contain', 'Overview');
    });

    it('Url should be vaild when add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService('TestGatewayService', 'tag1', 'testapi');
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', "Failed to construct 'URL': Invalid URL");
    });

    it('Add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService('TestGatewayService', 'tag1', 'http://testapi.com');
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', 'Gateway Service "TestGatewayService" successfully created!');
        cy.wait(1000);
    });

    it('gatewayService name should be unique when add a new gateway service', () => {
        homePage.GatewayServiceTab.click();
        cy.wait('@getGatewayServicelist');
        cy.addNewgatewayService('TestGatewayService', 'tag1', 'http://testapi.com');
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', `UNIQUE violation detected on '{name="TestGatewayService"}'`);
    });
});
