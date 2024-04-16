module.exports = api => {
  const isTest = api.env('test');

  console.log("babel.config.js", isTest);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-syntax-jsx',
      ["module-resolver", {
        "alias": {
          "%/className": "./src/className"
        }
      }],
      ["transform-class-properties", { "spec": true }]
    ]
  };
};
