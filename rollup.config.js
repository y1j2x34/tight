const tsp = require('rollup-plugin-typescript2');

const pkg = require('./package.json');

function createOutputConfig(file, format, name) {
    return {
        file,
        format,
        sourcemap: true,
        name,
        exports: 'named'
    };
}

function createPlugins() {
    return [
        tsp({
            tsconfig: 'tsconfig.json'
        })
    ];
}

module.exports = [
    {
        input: 'src/index.ts',
        output: [[pkg.browser, 'umd', 'txon'], [pkg.module, 'es']].map(confs =>
            createOutputConfig(confs[0], confs[1], confs[2])
        ),
        plugins: createPlugins()
    },
    {
        input: 'src/index.ts',
        output: createOutputConfig(pkg.main, 'cjs'),
        plugins: createPlugins()
    }
];
