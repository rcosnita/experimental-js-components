var grunt = require("grunt");

grunt.loadNpmTasks('grunt-jsdoc');

grunt.initConfig({
    "jsdoc" : {
        "dist" : {
            "src": ["src/**/*.js"],
            "options": {
                "destination": "doc",
                "configure": "jsdoc.json",
                "private": false
            }
        }
    }
});