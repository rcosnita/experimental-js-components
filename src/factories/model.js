define(["jquery", "eventemitter", "utils/constants"], function($, EventEmitter, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the foundation for all models available. Each model inherits this
     * base model and also becomes an event emitter.
     */
    function Model() { }

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method changes a given property with the new value. It also triggers a change event for outside
     * world.
     */
    Model.prototype.set = function(propertyName, newValue) {
        var oldValue = this.getData()[propertyName];

        this.getData()[propertyName] = newValue;

        var evtData = {"property": propertyName, "oldValue": oldValue, "newValue": newValue};

        this.trigger(Constants.MODEL_PROPERTY_CHANGE_EVENT, evtData);
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method retrieves the specified property name value from the current model.
     */
    Model.prototype.get = function(propertyName) {
        return this.getData()[propertyName];
    };

    EventEmitter.mixin(Model.prototype);

    /**
     * @constructor
     * @public
     * @description
     * This class provides a custom requirejs loader used to inject custom model classes.
     */
    function ModelPlugin() { }

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically by requirejs whenever a model dependency class must be injected.
     * @example
     * define(["factories/model!simple_model"], function(SimpleModel) { });
     */
    ModelPlugin.prototype.load = function(name, req, onload, config) {
        var modelPath = "models/" + name;

        req([modelPath], function(ModelCls) {
            $.extend(ModelCls.prototype, new Model());

            onload(ModelCls);
        });
    };

    return new ModelPlugin();
});