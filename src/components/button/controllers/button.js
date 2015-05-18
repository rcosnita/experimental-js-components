define(["jquery", "factories/view!button:index.html", "bootstrap"], function($, view) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the implementation for a button component.
     */
    function Button() {
        console.log("Button controller instantiated.");

        this.config = {
            "view": view
        };
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically by the framework in order to let the component to wire it's functionality. 
     At this stage, the component view is already binded to dom and works as expected.
     */
    Button.prototype.start = function() {
        var view = this.config.view,
            self = this;

        $(view.element).find("button").click(function() {
            self.trigger("click", {})
        });
    };

    return Button;
});