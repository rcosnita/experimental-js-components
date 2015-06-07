define(["factories/model!simple_model", "utils/constants"], function(SimpleModel, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This is the TodoApp constructor used to start the application.
     */
    function TodoApp() { };

    /**
     * This method is invoked automatically by the framework in order to configure the application. In this phase you must
     * configure each component your app uses as well as the selector used to bind your app to a dom element.
     * @return {Object} A promise object or a plain json which is going to be used as configuration.
     */
    TodoApp.prototype.configure = function() {
        return {
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
                },
                "grid-tasks": {
                    "model": new SimpleModel({
                        "columns": [
                            {"id": "#", "name": "#"},
                            {"id": "firstName", "name": "First name"},
                            {"id": "lastName", "name": "Last name"}
                        ],
                        "items": [
                            new SimpleModel({"#": "1", "firstName": "Radu Viorel", "lastName": "Cosnita"}),
                            new SimpleModel({"#": "2", "firstName": "Dan", "lastName": "Popa"}),
                            new SimpleModel({"#": "3", "firstName": "Adriana Elena", "lastName": "Cosnita"})
                        ]
                    })
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
            gridTasks = this.components["grid-tasks"];

        this._hideComponents([ddTaskTypes, gridTasks]);

        this._wireBtnRefreshEvents();
        this._wireDdTaskTypesEvents();
        this._wireGridTasksEvents();
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method hides / shows all components provided through comps.
     */
    TodoApp.prototype._hideComponents = function(comps, visible) {
        comps = comps || [];
        visible = visible || false;

        var evtName = !visible ? Constants.COMPONENT_HIDE_EVENT : Constants.COMPONENT_SHOW_EVENT;

        for (var compIdx in comps) {
            comps[compIdx].trigger(evtName, {});
        }
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method wires all events for btnRefresh button.
     */
    TodoApp.prototype._wireBtnRefreshEvents = function() {
        var ddTaskTypes = this.components["dd-task-types"],
            btnRefresh = this.components["btn-refresh"],
            gridTasks = this.components["grid-tasks"],
            self = this;

        btnRefresh.on(Constants.COMPONENT_BTN_CLICK_EVENT, function() {
            if (!ddTaskTypes.config.model.get(Constants.MODEL_PROPERTY_VISIBLE)) {
                ddTaskTypes.trigger(Constants.COMPONENT_SHOW_EVENT, {});
                gridTasks.trigger(Constants.COMPONENT_SHOW_EVENT, {});

                btnRefresh.config.model.set("label", "Hide task types");

                return;
            }

            ddTaskTypes.trigger(Constants.COMPONENT_HIDE_EVENT, {});
            gridTasks.trigger(Constants.COMPONENT_HIDE_EVENT, {});

            btnRefresh.config.model.set("label", "Show task types");            
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method wires all events for task types drop down.
     */
    TodoApp.prototype._wireDdTaskTypesEvents = function() {
        var ddTaskTypes = this.components["dd-task-types"];

        ddTaskTypes.on(Constants.COMPONENT_DD_ITEM_SELECTED_EVENT, function(model) {
            console.log("Item selected.");
            console.log(model);
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method wires all events for tasks grid.
     */
    TodoApp.prototype._wireGridTasksEvents = function() {
        var gridTasks = this.components["grid-tasks"],
            self = this;

        gridTasks.on(Constants.COMPONENT_DATAGRID_ITEM_SELECTED_EVENT, function(selectedItem) {
            console.log(selectedItem);
        });
    };

    return TodoApp;
});