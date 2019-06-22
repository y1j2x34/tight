'use strict';

// const process = require('process');
// process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = {
    basePath: '',

    frameworks: ['mocha', 'chai'],

    restartBrowserBetweenTests: false,

    files: ['test/**/*.spec.ts', {
        pattern: 'src/**/*.ts',
        served: true,
        included: false,
        watched: true
    }],

    mime: {
        'text/x-typescript': ['ts','tsx']
    },

    reporters: [],

    port: 9876,

    colors: true,

    autoWatch: true,

    usePolling: true,

    atomic_save: false,
    customLaunchers: {
        HeadlessChrome: {
            base: 'ChromeHeadless',
            flags: [
                '--no-sandbox',
                '--headless',
                '--disable-gpu',
                '--disable-translate',
                '--disable-extensions'
            ]
        }
    },

    singleRun: false,

    concurrency: Infinity
};
