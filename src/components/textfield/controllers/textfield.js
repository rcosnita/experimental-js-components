define(["jquery", "factories/view!textfield:index.html", "utils/constants"], function($, view, Constants) {
    /**
     * # Summary
     *
     * Textfield provides a simple input which accepts data from keyboard. It binds the value to the given model.
     * In order to be notified about this component internal state change it's enough to listen on model changes.
     *
     * # Examples
     *
     * ## Display latest value from textfield (while user types)
     *
     * ```javascript
     * // this example assumes the component is configured correctly and binded to model tfModel.
     *
     * function App() {
     *     this._filterModel = new SimpleModel({
     *         "placeholder": "Type your query here ...",
     *         "value": ""
     *     });
     * };
     * 
     * App.prototype.configure = function() {
     *     return {
     *         "selector": "div[data-sid='sample-app']",
     *         "components": {
     *              "tfQuickSearch": {
                        "model": this._filterModel
                    }
     *         }
     *     };
     * };
     * 
     * App.prototype.start = function() {
     *     this._filterModel.on("model:change", function(evt) {
     *         if (evt.property != "value") {
     *             return;
     *         }
     *
     *         console.log(evt.newValue);
     *     });
     * };
     * ```
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components
     * @extends UI/Components.Component
     */
    function TextField() { };

    /**
     * This method is invoked automatically by the framework in order to configure the textfield.
     * 
     * @return {JSON} Textfield synchronous configuration.
     */
    TextField.prototype.configure = function() {
        return {
            "view": view
        }
    };

    /**
     * This method binds the events on the textfield dom element and set the values on the underlining model accordingly.
     *
     * @public
     * @method
     */
    TextField.prototype.start = function() {
        var tfParent = $(this.config.view.element),
            textfield = $(tfParent.find("> [data-sid='textfield']")),
            model = this.config.model;

        textfield.keyup(function(evt) {
            model.set("value", textfield.val());
        });
    };

    return TextField;
});