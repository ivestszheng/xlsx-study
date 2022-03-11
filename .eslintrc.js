module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        'airbnb-base',
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",
        'plugin:jest/recommended',
        'prettier'
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "webpack.common.js"
            }
        }
    },
}
