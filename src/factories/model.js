define(["jquery", "eventemitter", "utils/constants"], 
    /**
     * This namespace provides all builtin models which can be used in order to interact with data 
     * (in memory or loaded from external data sources).
     * 
     * @namespace UI/Components/Models
     */
    function($, EventEmitter, Constants) {
    /**
     * This class provides the foundation for all models available. Each model inherits this
     * base model and also becomes an event emitter.
     *
     * # Model events
     *
     * Event name           | Event body           | Event description
     * -------------------- | -------------------- | -----------------
     * model:init           | {}                   | This event tells the model to start loading data.
     * model:init:completed | model json data      | This event is raised by the model as response to **model:init event**. The subscriber will receive the model data as body of this event.
     * model:change         | {"property": <propertyName>, "oldValue": <oldValue", "newValue": <newValue>} | This event is raised whenever a model property has been changed.
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components/Models
     */
    function Model() { }

    /**
     * This method must be overriden by each concrete model in order to provide a way to obtain underlining data
     * from the current model.
     * 
     * @public
     * @method
     * @instance
     * @abstract
     * 
     * @return {Object} the current loaded data set or a promise which will be resolved to model data.
     */
    Model.getData = function() {};

    /**
     * This method changes a given property with the new value. It also triggers a change event for components who
     * use this instance.
     * 
     * @public
     * @method
     * @param {String} propertyName The property name which must be set set into model.
     * @param {Object} newValue The property value which must set into model.
     */
    Model.prototype.set = function(propertyName, newValue) {
        var oldValue = this.getData()[propertyName];

        this.getData()[propertyName] = newValue;

        var evtData = {"property": propertyName, "oldValue": oldValue, "newValue": newValue};

        this.trigger(Constants.MODEL_PROPERTY_CHANGE_EVENT, evtData);
    };

    /**
     * This method retrieves the specified property name value from the current model.
     *
     * @public
     * @method
     * @param {String} propertyName The property name which must be retrieved from model.
     * @returns {Object} The property value if found in model or undefined otherwise.
     */
    Model.prototype.get = function(propertyName) {
        return this.getData()[propertyName];
    };

    /**
     * This method is used to distinguish model classes from regular ones.
     * 
     * @public
     * @method
     */
    Model.prototype.isModel = function() {
        return true;
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