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
                    "model": new SimpleModel({"label": "Show task types"})
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
        var ddTaskTypes = this.components["dd-task-types"],
            btnRefresh = this.components["btn-refresh"],
            self = this;

        ddTaskTypes.trigger(Constants.COMPONENT_HIDE_EVENT, {});

        ddTaskTypes.on(Constants.COMPONENT_DD_ITEM_SELECTED_EVENT, function(model) {
            console.log("Item selected.");
            console.log(model);
        });

        btnRefresh.on(Constants.COMPONENT_BTN_CLICK_EVENT, function() {
            if (!ddTaskTypes.config.model.get(Constants.MODEL_PROPERTY_VISIBLE)) {
                ddTaskTypes.trigger(Constants.COMPONENT_SHOW_EVENT, {});
                btnRefresh.config.model.set("label", "Hide task types");

                return;
            }

            ddTaskTypes.trigger(Constants.COMPONENT_HIDE_EVENT, {});
            btnRefresh.config.model.set("label", "Show task types");            
        });
    };

    return TodoApp;
});