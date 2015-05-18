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
            });
        });

        console.log("DropDown component started.");        
    };

    return DropDown;
});