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
     * # Lifecycle
     *
     * Each model has a predefined set of states which can be triggered through events. Take a look at the diagram
     * below in order to understand how it works.
     *
     * ![Model lifecycle](static/images/models/model_state_machine.png)
     * 
     * ## Events
     *
     * Event name           | Event body           | Event description
     * -------------------- | -------------------- | -----------------
     * model:init           | {}                   | This event tells the model to start loading data.
     * model:init:completed | model json data      | This event is raised by the model as response to **model:init event**. The subscriber will receive the model data as body of this event.
     * model:change         | {"property": <propertyName>, "oldValue": <oldValue", "newValue": <newValue>} | This event is raised whenever a model property has been changed.
     * model:validate       | {}                   | This event triggers model validation for the current state.
     * model:validate:completed |  {"validation": {"valid": false, "errors": []}}                | This event is triggered by the model in order to notify consumers about model validation result.
     * model:filter:init | <filter object> | This event can be triggered by any model consumer in order to trigger a filtering.
     * model:filter:completed | <model data> | This event is emitted by the model once the filtering was successful.
     *
     * ## Model validation
     *
     * Each model validation can be triggered by:
     *
     * 1. A consumer of the model triggers a **model:validate** event. Most of the time this will be extremely useful for {@link UI/Components.Component} which will trigger model validation based on component business logic.
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
     * @return {Object} the current loaded data set or a promise which will be resolved to model data.
     */
    Model.getData = function() {};

    /**
     * This method must be overriden by each concrete model which wants to provide validation logic.
     *
     * @public
     * @instance
     * @method
     * @abstract
     * @return {Promise} a promise which provides validation result when resolved.
     * @example
     * CustomModel.prototype.validate = function() {
     *     var validationLoader = $.Deferred();
     *
     *     setTimeout(function() {
     *         validationLoader.resolve({
     *             "valid": true,
     *             "errors": []
     *         });
     *     }, 100);
     * 
     *     return validationLoader.promise();
     * };
     */
    Model.validate = function() {};

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

    /**
     * This method wires common events for all models. By design, it must be manually invoked by each concrete model.
     * 
     * @private
     * @method
     */
    Model.prototype.__wireCommonEvents = function() {
        var self = this;

        this.on(Constants.MODEL_VALIDATE_EVENT, function() {
            if (!self.validate) {
                return;
            }

            var validationLoader = self.validate();

            validationLoader.always(function(validationResult) {
                self.triggers(Constants.MODEL_VALIDATE_COMPLETED_EVENT, validationResult);
            });
        });
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
        var nameParts = name.split(":"),
            fileName = nameParts[0],
            name = nameParts[1],
            version = nameParts[2],
            url = nameParts[3],
            modelPath = "models/" + fileName;

        req([modelPath], function(ModelCls) {
            $.extend(ModelCls.prototype, Model.prototype);

            if (url && version) {
                onload(new ModelCls({
                    "url": url,
                    "name": name,
                    "version": version
                }));

                return;
            }

            onload(ModelCls);
        });
    };

    return new ModelPlugin();
});