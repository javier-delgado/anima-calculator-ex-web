module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "require-jsdoc": "off",
        "max-len": ["warn", {
            "code": 120
        }],
        "no-use-before-define": "off",
        "no-console": ["error", {
            "allow": ["warn", "error"]
        }],
        "object-curly-newline": ["error", {
            "ImportDeclaration": "never",
        }],
        "no-underscore-dangle": ["error", {
            "allowAfterThis": true
        }]
    }
};
