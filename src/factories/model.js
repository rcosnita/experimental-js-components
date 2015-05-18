define(["jquery", "eventemitter"], function($, EventEmitter) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the foundation for all models available. Each model inherits this
     * base model and also becomes an event emitter.
     */
    function Model() { }

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