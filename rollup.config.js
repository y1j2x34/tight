const tsp = require('rollup-plugin-typescript2');

const pkg = require('./package.json');

function createOutputConfig(file, format, name='TXON') {
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
        output: [[pkg.browser, 'umd'], [pkg.module, 'es'], [pkg.main, 'cjs']].map(confs =>
            createOutputConfig(confs[0], confs[1], confs[2])
        ),
        plugins: createPlugins()
    }
];
