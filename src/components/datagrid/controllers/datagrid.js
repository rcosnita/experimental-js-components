define(["jquery", "factories/view!datagrid:index.html", "utils/constants", "jquery-ui"], function($, view, Constants) {
    /**
     * @public
     * @constructor
     * @description
     * This class provides the datagrid controller in which various models can be binded for presentation.
     */
    function DataGrid() { 
        this.config = {
            "view": view
        };

        console.log("DataGrid instantiated.");
    };

    /**
     * @private
     * @constant {String} This constant holds the model property name where items can be found.
     */
    DataGrid.prototype._ITEMS_MODEL_PROPERTY_NAME = "items";

    /**
     * @private
     * @constant {String} This constant holds the item index attribute name which is automatically rendered on each
     * grid row.
     */
    DataGrid.prototype._ITEM_IDX_ATTR_NAME = "data-item-index";

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically when the datagrid is started correctly.
     */
    DataGrid.prototype.start = function() {
        var gridElement = $(this.config.view.element),
            model = this.config.model;

        this._wireSelectItemEvent(gridElement, model);

        console.log("DataGrid started.");
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method is used to wire select item event to the current datagrid.
     */
    DataGrid.prototype._wireSelectItemEvent = function(gridElement, model) {
        var self = this;

        $(gridElement.find("table")[0]).click(function(evt) {
            var target = $(evt.target),
                element = target.attr(self._ITEM_IDX_ATTR_NAME) ? target : target.parent(),
                itemIdx = element.attr(self._ITEM_IDX_ATTR_NAME);

            if (!itemIdx) {
                return;
            }

            var item = model.get(self._ITEMS_MODEL_PROPERTY_NAME)[parseInt(itemIdx)];

            self.trigger(Constants.COMPONENT_DATAGRID_ITEM_SELECTED_EVENT, item);
        });
    };

    return DataGrid;
});