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
     * 
     * Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * comp:show | {} | Each component can receive this event in order to show in viewport.
     * comp:hide | {} | Each component can receive this event in order to hide from viewport.
     * comp:reload | {} | This is a custom event which can be used by component developers in order to reload and rerender the component. Usually it is recommended to avoid such an aggresive event because performance might be affected.
     *
     * # Validation
     *
     * Each component will intercept validation events triggered by the underlining model. Every error is handled implicitly 
     * and displayed to user in a unified way. For more information about model validation read {@link UI/Components/Models.Model}
     * 
     *
     * @class
     * @constructor
     * @public
     * @memberof UI/Components
     */
    function Component() {};

    /**
     * This method must be provided by each component in order to give it a chance to configure itself.
     *  
     * @public
     * @method
     * @instance
     * @abstract
     * @example
     * // plain JSON configuration object with all information known upfront.
     * SampleComponent.prototype.configure = function() {
     *     return {
     *         "view": view
     *     }
     * };
     *
     * @example
     * // lazy configuration loading. This alternative is extremely useful when the component requires dynamic data to configure itself.
     * SampleComponent.prototype.configure = function() {
     *     var configLoader = $.Deferred();
     *
     *     setTimeout(function() {
     *         configLoader.resolve({
     *             "view": new Object()
     *         });
     *     }, 100);
     * 
     *     return configLoader.promise();
     * };
     */
    Component.configure = function() {};

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
     * This method can be overriden in order to provide custom logic for implementing components. Each concrete component 
     * can implement this method in order to provide custom validation logic.
     * 
     * @public
     * @method
     * @instance
     * @abstract
     * @return {Promise} A jquery promise which provides validation result when resolved.
     * @example
     * MyComponent.prototype.validate = function() {
     *     var validationResolver = $.Deferred(),
     *         model = this.config.model;
     *
     *     $.get({"url": "/validate?a=" + model.get("property1")}).then(function(result) {
     *         validationResolver.resolve({
     *             "valid": true,
     *             "errors": []
     *         });
     *     });
     * 
     *     return validationResolver.promise();
     * };
     */
    Component.validate = function() { };

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

        this.on(Constants.COMPONENT_VALIDATE_EVENT, function() {
            if (self.validate) {
                var result = self.validate();

                result.always(function(validationResult) {
                    self.triggers(Constants.COMPONENT_VALIDATE_COMPLETED_EVENT, validationResult);
                });

                return;
            }

            var model = self.config.model;

            model.triggers(Constants.MODEL_VALIDATE_EVENT, {});

            model.on(Constants.MODEL_VALIDATE_COMPLETED_EVENT, function(validationResult) {
                self.triggers(Constants.COMPONENT_VALIDATE_COMPLETED_EVENT, validationResult);
            });
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
            $.extend(CompClass.prototype, Component.prototype);

            var comp = new CompClass();

            EventEmitter.mixin(comp);

            $.when(comp.configure()).then(function(compConfig) {
                comp.config = compConfig;

                comp.__wireCommonEvents();

                onload(comp);
            });
        });
    };

    return new ComponentPlugin();
});