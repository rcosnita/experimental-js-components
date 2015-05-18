define(["jquery", "eventemitter", "utils/constants"], function($, EventEmitter, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the foundation for each component available into framework.
     */
    function Component() {};

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method allows the component to refresh with the new model data currently configured.
     */
    Component.prototype.refresh = function() {
        var view = this.config.view,
            model = this.config.model;

        view.element.empty();
        view.element.append(view.render(self.config, model.getData()));
        
        this.__wireCommonEvents();

        this.trigger(Constants.COMPONENT_RELOAD_EVENT, {});
    };

    /**
     * @private
     * @instance
     * @method
     * This method is responsible for wiring common components events (e.g: show / hide events).
     */
    Component.prototype.__wireCommonEvents = function() {
        var self = this;

        this.on(Constants.COMPONENT_SHOW_EVENT, function() {
            self.config.view.element.show();
            self.config.model.set(Constants.MODEL_PROPERTY_VISIBLE, true);
        });

        this.on(Constants.COMPONENT_HIDE_EVENT, function() {
            self.config.view.element.hide();
            self.config.model.set(Constants.MODEL_PROPERTY_VISIBLE, false);
        });
    };    

    /**
     * @constructor
     * @public
     * @description
     * This class provides the implementation for a plugin which can load custom components available.
     */
    function ComponentPlugin() {}

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically in order to load the specified module.
     */
    ComponentPlugin.prototype.load = function(name, req, onload, config) {
        var compPath = [Constants.COMPONENTS_FOLDER, "/", name, "/", Constants.COMPONENTS_CONTROLLER_FOLDER, "/", name]
            .join(""),
            self = this;

        req([compPath], function(CompClass) {
            var comp = new CompClass();

            $.extend(comp, new Component());
            EventEmitter.mixin(comp);

            comp.__wireCommonEvents();

            onload(comp);
        });
    };

    return new ComponentPlugin();
});