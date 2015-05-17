requirejs.config({
    baseUrl: "../",
    paths: {
        "jquery": "../../lib/jquery-2.1.4",
        "models": "../../models",
        "components": "../../components",
        "controllers": "controllers"
    }
});

requirejs(["controllers/index"]);