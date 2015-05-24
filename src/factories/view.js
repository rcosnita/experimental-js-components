define(["jquery", "handlebars", "utils/constants"], 
    /**
     * @namespace UI/Components/Views
     */
    function($, Handlebars, Constants) {
    /**
     * This class provides the view foundation which can be used by all custom components. Each view benefits from 
     * Handlebars templating engine. Using handlebars, complex views can be coded easily making components development
     * extremely easy.
     *
     * @class
     * @constructor
     * @public
     * @memberof UI/Components/Views
     * @see  http://handlebarsjs.com/
     */
    function View(template) {
        this._templateText = template;
        this._template = Handlebars.compile(this._templateText);
    }

    /**
     * This method renders the current view using data from the given model.
     * 
     * @public
     * @method
     * @param {Object} config The configuration object before triggering render.
     * @param {Object} modelData The model data obtained from the model before triggering render.
     */
    View.prototype.render = function(config, modelData) {
        modelData = modelData || {};

        var ctx = {"config": config, "model": modelData};

        return this._template(ctx);
    };

    /**
     * @constructor
     * @public
     * @description
     * This class provides the logic for loading custom views belonging to a component.
     */
    function ViewPlugin() {}

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically whenever it is required to load a custom component view.
     */
    ViewPlugin.prototype.load = function(name, req, onload, config) {
        var parts = name.split(":"),
            compName = parts[0],
            viewPath = parts[1];

        if (viewPath[0] != "/") {
            viewPath = "/" + viewPath;
        }

        var viewFullPath = [Constants.COMPONENTS_FOLDER, "/", compName, "/", Constants.COMPONENTS_VIEW_FOLDER, viewPath]
                .join(""),
            textLoaderPath = "text!" + viewFullPath;

        req([textLoaderPath], function(viewText) {
            var view = new View(viewText);

            onload(view);
        });
    };

    return new ViewPlugin();
});