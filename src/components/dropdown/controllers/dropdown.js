define(["jquery", "factories/view!dropdown:index.html", "utils/constants"], function($, view, Constants) {
    /**
     * # Summary
     * 
     * Dropdown component allowing user to display various items and selected them.
     *
     * # Events
     *
     * Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * dd:selected-item | Model object representing selected item. | Triggered whenever a dropdown item is selected.
     *
     * # Model events
     *
     * Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * model:change | {"property": "title"} | Whenever the model sends a title change event the dropdown component updates the title.
     *
     * # Examples
     *
     * ```html
<!-- <custom_app>/views/index.html -->
<!DOCTYPE html>

<html>
    <head>
        <title>Welcome to dropdown sample application.</title>
    </head>

    <body>
        <div data-sid="app"> 
            <div data-comp-sid="dd-sample" data-comp-type="dropdown"></div>
        </div>
    </body>
</html>
     * ```
     *
     * ```javascript
// <custom_app>/controllers/index.js
define(["factories/model!simple_model", "utils/constants"], function(SimpleModel, Constants) {
    function App() {
        this.config = {
            "selector": "div[data-sid='app']",
            "components": {
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

    App.prototype.start = function() {
        this._wireDdTaskTypesEvents();
    };

    App.prototype._wireDdTaskTypesEvents = function() {
        var ddTaskTypes = this.components["dd-sample"];

        ddTaskTypes.on("dd:selected-item", function(model) {
            console.log(model);
        });
    };

    return App;
});
     * ```
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components
     */
    function DropDown() { 
        this.config = {
            "view": view
        }

        console.log("DropDown controller instantiated.");
    };

    /**
     * This method implements the logic executed when the component is fully started.
     * 
     * @public
     * @method
     */
    DropDown.prototype.start = function() {
        var model = this.config.model,
            self = this;

        this._bindDropDownEvents();

        this.on(Constants.COMPONENT_RELOAD_EVENT, function() {
            self._bindDropDownEvents();
        });

        model.on(Constants.MODEL_PROPERTY_CHANGE_EVENT, function(changeData) {
            if (changeData.property !== "title") {
                return;
            }

            self.refresh();
        });

        console.log("DropDown component started.");        
    };

    /**
     * This method binds drop down events to the dom element and transform them to high level component events.
     * 
     * @private
     * @method
     */
    DropDown.prototype._bindDropDownEvents = function() {
        var model = this.config.model,
            view = this.config.view,
            domElement = view.element,
            ddElem = domElement.find("button[data-sid='dropdown']").dropdown(),
            self = this;

        domElement.find(".dropdown").find(".dropdown-menu").each(function(idx, itemElem) {
            $(itemElem).click(function(evt) {
                var elem = $(evt.target),
                    idx = elem.attr("data-index"),
                    itemModel = model.getData().items[idx];

                self.trigger(Constants.COMPONENT_DD_ITEM_SELECTED_EVENT, itemModel);
                model.set("selectedItem", itemModel);
                model.set("title", itemModel[self.config.textName]);
            });
        });
    };

    return DropDown;
});