'use strict';

const path = require('path');
const baseConfig = require('./karma.base.conf');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

    const coverageIstanbulReporter = {
        reports: ['text-summary', 'cobertura'],
        dir: path.join(__dirname, 'coverage'),
        skipFilesWithNoCoverage: true
    };

    config.set(baseConfig);

    config.set({
        preprocessors: {
            'test/**/*.spec.ts': ['sourcemap', 'rollup']
        },
        rollupPreprocessor: require('./rollup-karma.config'),
        reporters: ['coverage-istanbul'],
        coverageIstanbulReporter: coverageIstanbulReporter,

        logLevel: config.LOG_DEBUG,

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-puppeteer-launcher',
            'karma-chrome-launcher',
            'karma-rollup-preprocessor',
            'karma-coverage-istanbul-reporter',
            'karma-sourcemap-loader',
            'karma-mocha-reporter'
        ],
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
