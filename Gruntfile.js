var grunt = require("grunt");

grunt.loadNpmTasks('grunt-jsdoc');

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
    }
});