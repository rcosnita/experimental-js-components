define(["jquery", "handlebars", "utils/constants"], 
    function($, Handlebars, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the view foundation which can be used by all custom components.
     */
    function View(template) {
        this._templateText = template;
        this._template = Handlebars.compile(this._templateText);
    }

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method renders the current view using data from the given model. In addition it receives the current
     * configuration of the component which triggered the rendering.
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