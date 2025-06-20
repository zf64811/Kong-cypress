import HomePage from '../../../pages/home.page';
import RoutePage from '../../../pages/route.page';
import OverViewPage from '../../../pages/overview.page';

const overViewPage = new OverViewPage();
const homePage = new HomePage();
const routePage = new RoutePage();

describe('Test Add Route', () => {
    let name, tag, path;
    let getGatewayServicelistAPI, getrouteListAPI;
    let workspacesTitle, overViewPageTitle;

    before(() => {
        cy.fixture('routeData').then(data => {
            ({ name, tag, path } = data.validRoute);
            ({ getGatewayServicelistAPI, getrouteListAPI } = data.routeAPI);
            ({ workspacesTitle, overViewPageTitle } = data.contextAssert);
        });
    });

    beforeEach(() => {
        cy.intercept('GET', getGatewayServicelistAPI).as('getGatewayServicelist');
        cy.intercept('GET', getrouteListAPI).as('getRouteList');
        cy.workspacesLogin();
        homePage.workspacesTitle.should('be.visible').and('contain', workspacesTitle);
        homePage.workspaceName.click();
        overViewPage.OverViewPageTitle.should('be.visible').and('contain', overViewPageTitle);
        homePage.RouteTab.click();
        cy.wait('@getRouteList');
    });

    it('Add new Routes', () => {
        cy.addRoute(name, tag, path);
        routePage.routePrompt_Message
            .should('be.visible')
            .and('contain', `Route "${name}" successfully created!`);
    });

    it('Route name should unique when add new Routes', () => {
        cy.addRoute(name, tag, path);
        routePage.routeAlert_Message
            .should('be.visible')
            .and('contain', `UNIQUE violation detected on '{name="${name}"}'`);
    });
});
