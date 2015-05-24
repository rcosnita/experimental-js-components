define(["utils/constants"], function(Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This model provides a simple wrapper over a json object.
     */
    function SimpleModel(json) {
        this._json = json || {};

        this._wireEvents();
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method returns the current loaded data belonging to the model.
     */
    SimpleModel.prototype.getData = function() {
        return this._json;
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