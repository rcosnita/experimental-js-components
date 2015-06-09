var grunt = require("grunt");

grunt.loadNpmTasks('grunt-jsdoc');
grunt.loadNpmTasks('grunt-contrib-requirejs');

grunt.initConfig({
    "jsdoc" : {
        "dist" : {
            "src": ["src/**/*.js", "doc-lib/index.md"],
            "options": {
                "destination": "doc",
                "configure": "jsdoc.json",
                "private": false
            }
        }
    },
    "requirejs": {
        "compile": {
            "options": {
                "baseUrl": ".",
                "appDir": ".",
                "dir": "dist",
                "fileExclusionRegExp": /(node_modules|doc|doc-lib)$/,
                "paths": {
                    "jquery": "lib/jquery-2.1.4",
                    "jquery-ui": "lib/jquery-ui-1.10.4.min",
                    "text": "lib/text-2.0.14",
                    "eventemitter": "lib/microevent",
                    "handlebars-lib": "lib/handlebars-3.0.3",
                    "handlebars": "src/utils/handlebars",
                    "bootstrap": "lib/bootstrap-3.3.4/js/bootstrap",
                    "models": "src/models",
                    "components": "src/components",
                    "factories": "src/factories",
                    "utils": "src/utils"
                }
            }
        }
    }
});