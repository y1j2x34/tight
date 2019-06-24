const rollupTypescriptPlugin = require('rollup-plugin-typescript2');
const rollupNodeResolvePlugin = require('rollup-plugin-node-resolve');
const rollupCommonjsPlugins = require('rollup-plugin-commonjs');

const rollupPlugins = [
    rollupTypescriptPlugin({
        tsconfig: './test/tsconfig.json',
        tsconfigOverride: {
            compilerOptions: {
                module: 'esnext',
                inlineSourceMap: false
            }
        }
    }),
    rollupNodeResolvePlugin({
        jsnext: true,
        main: true,
        module: true,
        browser: true,
        preferBuiltins: false
    }),
    rollupCommonjsPlugins({
        include: ['node_modules/**'],
        namedExports: {
            'chai': ['expect']
        }
    })
];

module.exports = {
    context: 'this',
    watch: true,
    output: {
        format: 'iife',
        name: 'TXON',
        sourcemap: 'inline'
    },
    plugins: rollupPlugins,
    onwarn: function(warning) {
        if(warning.code === 'CIRCULAR_DEPENDENCY') {
            return;
        }
        console.warn(`(!) ${warning.message}`);
    }
};
