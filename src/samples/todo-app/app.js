requirejs.config({
    baseUrl: "../",
    paths: {
        "jquery": "../../../lib/jquery-2.1.4",
        "text": "../../../lib/text-2.0.14",
        "eventemitter": "../../../lib/microevent",
        "handlebars": "../../../lib/handlebars-3.0.3",
        "bootstrap": "../../../lib/bootstrap-3.3.4/js/bootstrap",
        "models": "../../models",
        "components": "../../components",
        "factories": "../../factories",
        "utils": "../../utils"
    }
});

requirejs(["factories/app!controllers/index"]);