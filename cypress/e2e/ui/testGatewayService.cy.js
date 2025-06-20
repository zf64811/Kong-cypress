import HomePage from '../../../pages/home.page';
import OverViewPage from '../../../pages/overview.page';
import GatewayServicePage from '../../../pages/gatewayService.page';

const gatewayServicePage = new GatewayServicePage();
const homePage = new HomePage();
const overViewPage = new OverViewPage();

describe('Test Add GatewayService', () => {
    let gatewayServicelistAPI;
    let serviceName, tag, invalidApi, validaApi;
    let workspacesTitle, overViewPageTitle;

    before(() => {
        cy.fixture('gatewayData').then(data => {
            ({ serviceName, tag, invalidApi, validaApi } = data.gatewayService);
            ({ gatewayServicelistAPI } = data.gatewayAPI);
            ({ workspacesTitle, overViewPageTitle } = data.contextAssert);
        });
    });

    beforeEach(() => {
        cy.intercept('GET', gatewayServicelistAPI).as('gatewayServicelist');
        cy.workspacesLogin();
        homePage.workspacesTitle.should('be.visible').and('contain', workspacesTitle);
        homePage.workspaceName.click();
        overViewPage.OverViewPageTitle.should('be.visible').and('contain', overViewPageTitle);
        homePage.GatewayServiceTab.click();
        cy.wait('@gatewayServicelist');
    });

    it('Url should be vaild when add a new gateway service', () => {
        cy.addNewgatewayService(serviceName, tag, invalidApi);
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', "Failed to construct 'URL': Invalid URL");
    });

    it('Add a new gateway service successfully', () => {
        cy.addNewgatewayService(serviceName, tag, validaApi);
        cy.wait(1000);
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', `Gateway Service "${serviceName}" successfully created!`);
        cy.wait(1000);
    });

    it('gatewayService name should be unique when add a new gateway service', () => {
        cy.addNewgatewayService(serviceName, tag, validaApi);
        gatewayServicePage.gatewayServiceAlert_Message
            .should('be.visible')
            .and('contain', `UNIQUE violation detected on '{name="${serviceName}"}'`);
    });

    it('Delete a new gateway service', () => {
        gatewayServicePage.gatewayServiceFilter_Button.click();
        gatewayServicePage.filterbyName_Button.click();
        gatewayServicePage.filterbyName_Input.should('be.visible').type(serviceName);
        gatewayServicePage.filterApply_Button.click();
        cy.wait(1000);
        gatewayServicePage.actionButton.should('be.visible').click();
        gatewayServicePage.delete_Button.should('be.visible').click();
        gatewayServicePage.confirmDelete_Input.should('be.visible').type(serviceName);
        gatewayServicePage.confirmDelete_Input.should('have.value', serviceName);
        gatewayServicePage.confirmDelete_button.should('be.visible').click();
        gatewayServicePage.gatewayServicePrompt_Message
            .should('be.visible')
            .and('contain', `Gateway Service "${serviceName}" successfully deleted!`);
    });
});
