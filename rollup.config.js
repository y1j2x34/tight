const tsp = require('rollup-plugin-typescript2');
const copy = require('rollup-plugin-copy');

const pkg = require('./package.json');

function createOutputConfig(file, format, name='TXON') {
    return {
        file: 'dist/' + file,
        format,
        sourcemap: true,
        name,
        exports: 'default'
    };
}

function createPlugins() {
    return [
        tsp({
            tsconfig: 'tsconfig.json',
            objectHashIgnoreUnknownHack: true
        }),
        copy({
            targets: [
                { src: 'package.json', dest: 'dist/'},
                { src: 'README.md', dest: 'dist/'},
                { src: 'LICENSE', dest: 'dist/'}
            ]
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
