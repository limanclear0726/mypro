

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var env = process.env.NODE_ENV || "production";

exports.default = {
    "produce": env,
    "port": {
        "local": 3000,
        "dev": 3000,
        "test": 3000,
        "production": 3000
    },

    "apihost": {
        "index": {
            "local": "http:*",
            "dev": "http:*",
            "test": "http:*",
            "production": "http:*"
        }
    }

};