define(["jquery", "eventemitter", "utils/constants"], 

    /**
     * @namespace  UI/Components
     */
    function($, EventEmitter, Constants) {
    /**
     * # Summary
     * 
     * This class provides the foundation for each component available into framework. Each component from framework
     * has several builtin events presented below.
     *
     * # Events
     * Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * comp:show | {} | Each component can receive this event in order to show in viewport.
     * comp:hide | {} | Each component can receive this event in order to hide from viewport.
     * comp:reload | {} | This is a custom event which can be used by component developers in order to reload and rerender the component. Usually it is recommended to avoid such an aggresive event because performance might be affected.
     *
     * @class
     * @constructor
     * @public
     * @memberof UI/Components
     */
    function Component() {};

    /**
     * This method allows the component to refresh with the new model data currently configured. It is extremely 
     * convenient for one way data binding algorithm. 
     * 
     * @public
     * @method
     */
    Component.prototype.refresh = function() {
        var view = this.config.view,
            model = this.config.model;

        view.element.empty();
        view.element.append(view.render(this.config, model.getData()));
        
        this.__wireCommonEvents();

        this.trigger(Constants.COMPONENT_RELOAD_EVENT, {});
    };

    /**
     * This method is responsible for wiring common components events (e.g: show / hide events).
     * 
     * @private
     * @method
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
     * This class provides the implementation for a plugin which can load custom components available.
     * 
     * @constructor
     * @public
     */
    function ComponentPlugin() {}

    /**
     * This method is invoked automatically in order to load the specified module.
     * 
     * @public
     * @method
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