define(["jquery", "factories/view!datagrid:index.html", "utils/constants", "jquery-ui"], 
    function($, view, Constants) {
    /**
     * # Summary
     * 
     * Datagrid provides a simple component which can present various models into a table like format.
     *
     * # Events
     *
     *  Event name | Event body | Event description
     * ---------- | ---------- | -----------------
     * datagrid:selected-row | Model object representing selected row. | Triggered whenever a datagrid row is selected.
     *
     * 
     * @public
     * @class
     * @constructor
     * @memberof UI/Components
     * @extends UI/Components.Component
     */
    function DataGrid() { };

    /**
     * This method is invoked automatically by the framework in order to give component a chance to configure itself.
     * 
     * @public
     * @method
     * @return {Object} the datagrid configuration containing only the view used for rendering.
     */
    DataGrid.prototype.configure = function() {
        return {
            "view": view
        };
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
     * This method is invoked automatically when the datagrid is started correctly.
     * 
     * @public
     * @method
     */
    DataGrid.prototype.start = function() {
        var gridElement = $(this.config.view.element),
            model = this.config.model;

        this._wireSelectItemEvent(gridElement, model);

        console.log("DataGrid started.");
    };

    /**
     * This method is used to wire select item event to the current datagrid.
     * 
     * @private
     * @method
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