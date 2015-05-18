define(["utils/constants"], function(Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This model provides a simple wrapper over a json object.
     */
    function SimpleModel(json) {
        console.log("SimpleModel instantiated.");

        this._json = json;

        this._wireEvents();
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method wires all required events for being able to communicate with the model.
     */
    SimpleModel.prototype._wireEvents = function() {
        var self = this;

        this.on(Constants.MODEL_INIT_EVENT, function() {
            self.trigger(Constants.MODEL_INIT_COMPLETED_EVENT, self._json);
        });        
    };

    return SimpleModel;
});