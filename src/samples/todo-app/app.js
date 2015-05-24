requirejs.config({
    baseUrl: "../",
    paths: {
        "jquery": "../../../lib/jquery-2.1.4",
        "jquery-ui": "../../../lib/jquery-ui-1.10.4.min",
        "text": "../../../lib/text-2.0.14",
        "eventemitter": "../../../lib/microevent",
        "handlebars-lib": "../../../lib/handlebars-3.0.3",
        "handlebars": "../../utils/handlebars",
        "bootstrap": "../../../lib/bootstrap-3.3.4/js/bootstrap",
        "models": "../../models",
        "components": "../../components",
        "factories": "../../factories",
        "utils": "../../utils"
    }
});

requirejs(["factories/app!controllers/index"]);