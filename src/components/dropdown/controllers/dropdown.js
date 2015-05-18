define(["jquery", "factories/view!dropdown:index.html", "utils/constants"], function($, view, Constants) {
    /**
     * @public
     * @constructor
     * @description
     * This class provides the implementation for dropdown component.
     */
    function DropDown() { 
        console.log("DropDown controller instantiated.");

        this.config = {
            "view": view
        }
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method implements the logic executed when the component is fully started.
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
     * @private
     * @instance
     * @method
     * @description
     * This method binds drop down events to the dom element and transform them to high level component events.
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