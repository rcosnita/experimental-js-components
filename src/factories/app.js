/**
 * @namespace  UI/Components/Apps
 */
define(["jquery", "utils/constants"], function($, Constants) {
    /**
     * This class provides the foundation for each application which is going to be created using the convention from this experiment.
     *
     * @class
     * @constructor
     * @public
     * @memberof UI/Components/Apps
     */
    function App() {}

    /**
     * This method is used to bind the app root context and loads all children subcomponents. All physical bindings
     * are saved into components attribute.
     * 
     * @private
     * @method
     */ 
    App.prototype._bindRootContext = function(req) {
        var compLoadersPromise = $.Deferred(),
            compLoaders = [],
            config = this.configure(),
            self = this;

        $.when(config).then(function(config) {
            self.config = config;

            self.components = {
                "root": $(self.config.selector)
            };

            $("*[data-comp-type]").each(function(elem, elemValue) {
                compLoaders.push(self._createComponent(req, $(elemValue)));
            });

            compLoadersPromise.resolve(compLoaders);
        });

        return compLoadersPromise.promise();
    };


    /**
     * This method is responsible for transforming the given element into a component and bind it's controller to components namespace.
     * 
     * @private
     * @method
     * @param {Require} req requirejs instance which can be used to load additional dependencies.
     * @param {JqueryObject} elem The jquery element which we want to transform into a component.
     * @returns {Promise} a promise which return the component controller when resolved.
     */
    App.prototype._createComponent = function(req, elem) {
        var sid = elem.attr(Constants.COMPONENT_SID_ATTR_NAME),
            compType = elem.attr(Constants.COMPONENT_TYPE_ATTR_NAME),
            compLoadId = ["factories/component!", compType].join(""),
            loadPromise = $.Deferred(),
            self = this;

        req([compLoadId], function(comp) {
            comp.config.view.element = elem;
            comp.config.view.component = comp;

            $.extend(comp.config, (self.config.components || {})[sid] || {});

            comp.config.parentApp = self;

            self.components[sid] = comp;

            self._initComponentModel(comp);

            loadPromise.resolve();
        });

        return loadPromise.promise();
    };

    /**
     * This method initializes the given component model by triggering model init event. Once the model is completely
     * initialized the component is started.
     * 
     * @private
     * @method
     * @param {UI.Components.Component} comp The component for which we initialize the model.
     */
    App.prototype._initComponentModel = function(comp) {
        var elem = comp.config.view.element;

        if(comp.config.model) {
            comp.config.model.on(Constants.MODEL_INIT_COMPLETED_EVENT, function(modelData) {
                elem.append(comp.config.view.render(comp.config, modelData));

                comp.start();
            });

            comp.config.model.trigger(Constants.MODEL_INIT_EVENT);
        }                    
    };


    /**
     * This plugin improves requirejs and makes it possible to load application controllers.
     *
     * @constructor
     * @public
     */
    function AppPlugin() {}

    /**
     * This method is invoked automatically in order to load the given plugin.
     *      
     * @public
     * @method
     */
    AppPlugin.prototype.load = function(name, req, onload, config) {
        req([name], function(LoadedApp) {
            app = new LoadedApp();

            $.extend(app, new App());

            $(document).ready(function() {
                var loadersPromise = app._bindRootContext(req),
                    resolvedLoaders = 0;

                loadersPromise.then(function(loaders) {
                    $.when.apply($, loaders).then(function() {
                        app.start();
                        onload(app);
                    });
                });
            });
        });
    };

    return new AppPlugin();
});