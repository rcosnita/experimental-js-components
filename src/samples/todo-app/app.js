requirejs.config({
    baseUrl: "../",
    paths: {
        "jquery": "../../../lib/jquery-2.1.4",
        "text": "../../../lib/text-2.0.14",
        "models": "../../models",
        "components": "../../components",
        "factories": "../../factories",
        "utils": "../../utils"
    }
});

requirejs(["factories/app!controllers/index"]);