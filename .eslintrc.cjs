module.exports = {
  "env": {
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "globals": {
    "SpreeDash":   "readonly",
    "Turbo":            "readonly",
    "URL":              "readonly",
    "SPREE_CURRENCY":   "readonly",
    "SPREE_LOCALE":     "readonly",
    "SpreeDash.OAUTH_TOKEN":      "readonly",
    "Handlebars":       "readonly",
    "SpreeDash.ADDRESS_FIELDS":   "readonly",
    "clearTimeout":     "readonly",
    "setTimeout":       "readonly",
    "jQuery":           "readonly",
    "$":                "readonly",
    "document":         "readonly",
    "window":           "readonly",
    "console":          "readonly",
    "fetch":            "readonly",

    "updateAddressState": "readonly",
    "toggleItemEdit":     "readonly",
    "confirm":            "readonly",
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
}
