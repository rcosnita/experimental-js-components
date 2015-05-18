define(["factories/model!simple_model", "utils/constants"], function(SimpleModel, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This is the TodoApp constructor used to start the application.
     */
    function TodoApp() {
        console.log("Todo App instantiated.");

        this.config = {
            "selector": "div[data-sid='todo-app']",
            "components": {
                "btn-refresh": { 
                    "model": new SimpleModel({"label": "Custom button"})
                }
            }
        };
    };

    /**
     * @public
     * @instance
     * @description
     * This method is invoked automatically when application starts.
     */
    TodoApp.prototype.start = function() {
        this.components["btn-refresh"].on(Constants.COMPONENT_BTN_CLICK_EVENT, function() {
            console.log("Works as a charm.");
        });
    };

    return TodoApp;
});