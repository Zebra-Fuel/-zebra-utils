import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'main.js',
    output: { file: 'index.js', format: 'cjs' },
    plugins: [resolve({ customResolveOptions: { moduleDirectory: 'node_modules' } })],
    external: ['lodash', '@pollyjs/core', '@pollyjs/utils', '@pollyjs/persister-fs'],
};
