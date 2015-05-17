define(["jquery", "utils/constants"], function($, Constants) {
    /**
     * @constructor
     * @private
     * @description
     * This class provides the foundation for each application which is going to be created using the convention from this experiment.
     */
    function App() {}

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method is used to bind the app root context and loads all children subcomponents. All physical bindings
     * are saved into components attribute.
     */ 
    App.prototype._bindRootContext = function() {
        var self = this;

        this.components = {
            "root": $(this.config.selector)
        };

        $("*[data-comp-type]").each(function(elem, elemValue) {
            self._createComponent($(elemValue));
        });
    };


    /**
     * @private
     * @instance
     * @method
     * @param {JqueryObject} elem The jquery element which we want to transform into a component.
     * @description
     * This method is responsible for transforming the given element into a component and bind it's controller to components namespace.
     */
    App.prototype._createComponent = function(elem) {
        var sid = elem.attr(Constants.COMPONENT_SID_ATTR_NAME),
            compType = elem.attr(Constants.COMPONENT_TYPE_ATTR_NAME);

        console.log(sid);
        console.log(compType);
    };


    /**
     * @constructor
     * @public
     * @description
     * This plugin provides the requirejs plugin used to instantiate applications.
     */
    function AppPlugin() {}

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically in order to load the given plugin.
     */
    AppPlugin.prototype.load = function(name, req, onload, config) {
        req([name], function(LoadedApp) {
            app = new LoadedApp();

            $.extend(app, new App());

            onload(app);

            $(document).ready(function() {
                app._bindRootContext();

                app.start();
            });
        });
    };

    return new AppPlugin();
});