const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8002',
        screenshotOnRunFailure: true,
        video: true,
        viewportWidth: 1920,
        viewportHeight: 1080,
        responseTimeout: 30000,
        setupNodeEvents(on, config) {
            on('before:run', async details => {
                console.log('override before:run');
                await beforeRunHook(details);
            });

            on('after:run', async () => {
                console.log('override after:run');
                await afterRunHook();
            });
        },
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports',
        charts: true,
        reportPageTitle: 'Kong Manager Test Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },
});
