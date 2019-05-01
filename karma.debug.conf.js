'use strict';

const path = require('path');
const baseConfig = require('./karma.base.conf');

module.exports = function (config) {

    const coverageIstanbulReporter = {
        reports: ['html', 'text-summary'],
        dir: path.join(__dirname, 'coverage'),
        skipFilesWithNoCoverage: true,
        'report-config': {
            html: {
                dir: path.join(__dirname, 'coverage/html-report')
            }
        }
    };

    config.set(baseConfig);

    config.set({
        preprocessors: {
            'test/**/*.spec.ts': ['sourcemap', 'rollup']
        },
        rollupPreprocessor: require('./rollup-karma.config'),
        reporters: ['progress', 'mocha', 'coverage-istanbul'],
        coverageIstanbulReporter: coverageIstanbulReporter,

        logLevel: config.LOG_DEBUG,

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-rollup-preprocessor',
            'karma-coverage-istanbul-reporter',
            'karma-sourcemap-loader',
            'karma-mocha-reporter'
        ],
        browsers: ['Chrome']
    });
};
