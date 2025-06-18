import HomePage from '../../../pages/home.page';
import OverViewPage from '../../../pages/overview.page';
import GatewayServicePage from '../../../pages/gatewayService.page';

const gatewayServicePage = new GatewayServicePage();
const homePage = new HomePage();
const overViewPage = new OverViewPage();

describe('Test GatewayService', () => {
  before(() => {
    cy.intercept('GET', 'http://localhost:8001/default/services?sort_desc=1&size=30').as(
      'getGatewayServicelist'
    );
    cy.workspacesLogin();
    homePage.workspacesTitle.should('be.visible').and('contain', ' Workspaces ');
    homePage.workspaceName.click();
    overViewPage.OverViewPageTitle.should('be.visible').and('contain', 'Overview');
  });

  it('should add a new gateway service', () => {
    homePage.GatewayServiceTab.click();
    cy.wait('@getGatewayServicelist');
    gatewayServicePage.addNewgatewayService_Button.click();
    gatewayServicePage.newgatewayServiceName_Input.type('TestGatewayService');
  });
});
