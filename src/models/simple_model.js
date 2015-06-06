define(["utils/constants"], function(Constants) {
    /**
     * This model provides a simple wrapper over a json object.
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components/Models
     * @extends UI.Components.Models.Model
     */
    function SimpleModel(json) {
        this._json = json || {};

        this._wireEvents();
    };

    /**
     * This method returns the current loaded data belonging to the model.
     * @public
     * @method
     */
    SimpleModel.prototype.getData = function() {
        return this._json;
    };

    /**
     * This method wires all required events for being able to communicate with the model.
     * @private
     * @method
     */
    SimpleModel.prototype._wireEvents = function() {
        var self = this;

        this.on(Constants.MODEL_INIT_EVENT, function() {
            self.trigger(Constants.MODEL_INIT_COMPLETED_EVENT, self._json);
        });        
    };

    return SimpleModel;
});