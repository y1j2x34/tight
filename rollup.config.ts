// import commonjs from 'rollup-plugin-commonjs';
import tsp from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

function createOutputConfig(file: string, format: string, name?: string) {
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

export default [
    {
        input: 'src/index.ts',
        output: [[pkg.browser, 'umd', 'tight'], [pkg.module, 'es']].map(confs =>
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
