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
                },
                "dd-task-types": {
                    "model": new SimpleModel({
                        "title": "Sample dropdown",
                        "items": [
                            {"name": "Work task", "value": 1, "attr1": "Attribute 1 of work task."},
                            {"name": "Personal task", "value": 2, "attr1": "Attribute 2 of personal task."}
                        ]
                    }),
                    "valueName": "value",
                    "textName": "name"
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
        this.components["dd-task-types"].on(Constants.COMPONENT_DD_ITEM_SELECTED, function(model) {
            console.log("Item selected.");
            console.log(model);
        });

        this.components["btn-refresh"].on(Constants.COMPONENT_BTN_CLICK_EVENT, function() {
            console.log("Works as a charm.");
        });
    };

    return TodoApp;
});