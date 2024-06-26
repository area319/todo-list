module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: [
        ["transform-class-properties", { "spec": true }]
    ]
};
