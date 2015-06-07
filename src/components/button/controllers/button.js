define(["jquery", "factories/view!button:index.html", "utils/constants", "bootstrap"], 
    function($, view, Constants) {
    /**
     * # Summary
     *
     * Button component provides a very simple pressable button which can provides various events in order to allow
     * app developers to intercept button interactions.
     * 
     * # Events
     *
     * Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * btn:click | {} | Triggered whenever the button is pressed.
     *
     * In addition to above mentioned events, you can also use {@link UI/Components.Component} events. 
     * 
     * # Examples
     *
     * ```html
     * <html>
     *     <head>
     *         <title>Simple app using button</title>
     *     </head>
     *     
     *     <body>
     *         <div data-comp-sid="btn-sample" data-comp-type="button"></div>
     *     </body>
     * </html>
     * ```
     *
     * ```js
     * define(["factories/model!simple_model", "utils/constants"], function(SimpleModel, Constants) {
     *     function App() {
     *         console.log("Sample app instantiated.");
     *
     *         this.config = {
     *             "btn-sample": {
     *                 "model": new SimpleModel({"label": "Demo button."});
     *             }
     *         };
     *     };
     *
     *     App.prototype.start = function() {
     *         var btn = this.components["btn-sample"];
     *
     *         btn.on("btn:click", function() {
     *             alert("Button clicked.");
     *         }); 
     *     };
     *
     *     return App;
     * }
     * ```
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components
     * @extends UI/Components.Component
     */
    function Button() { 
        console.log("Button controller instantiated.");
    };

    /**
     * This method is invoked automatically by the framework in order to configure the component instance.
     *
     * @public
     * @method
     * @return {Object} the button configuration containing only the view used.
     */
    Button.prototype.configure = function() {
        return {
            "view": view
        };
    };

    /**
     * This method is invoked automatically by the framework in order to let the component to wire it's functionality. 
     * At this stage, the component view is already binded to dom and works as expected.
     * 
     * @public
     * @method
     */
    Button.prototype.start = function() {
        var view = this.config.view,
            model = this.config.model,
            self = this;

        this._wireEvents();

        model.on(Constants.MODEL_PROPERTY_CHANGE_EVENT, function(changeData) {
            if (changeData.property !== "label") {
                return;
            }

            self.refresh();

            self._wireEvents();
        });
    };

    /**
     * This method wires all events required for this button to work.
     * 
     * @private
     * @method
     */
    Button.prototype._wireEvents = function() {
        var view = this.config.view,
            self = this;

        $(view.element).find("button").click(function() {
            self.trigger(Constants.COMPONENT_BTN_CLICK_EVENT, {});
        });
    };

    return Button;
});