define(["jquery", "factories/view!textfield:index.html", "utils/constants"], function($, view, Constants) {
    function TextField() { };

    TextField.prototype.configure = function() {
        return {
            "view": view
        }
    };

    TextField.prototype.start = function() {
        var tfParent = $(this.config.view.element),
            textfield = $(tfParent.find("> [data-sid='textfield']")),
            model = this.config.model;

        textfield.keyup(function(evt) {
            model.set("value", textfield.val());
        });
    };

    return TextField;
});