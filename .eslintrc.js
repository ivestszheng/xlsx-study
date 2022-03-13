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
    "rules": {
        "@typescript-eslint/no-explicit-any": ["off"],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "no-param-reassign": [
            "error",
            {
                "props": true,
                "ignorePropertyModificationsFor": [
                    "res", // for Express responses
                    "item", // for Express responses
                    "state" // for vuex state 解决assignment to property of function parameter 'state'
                ]
            }
        ]
    }
}
