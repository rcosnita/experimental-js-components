define(["factories/model!simple_model",
    "factories/model!rest_model:options:v3:../options.json"], function(SimpleModel, optionsModel) {
    function DropDownSampleApp() { };

    DropDownSampleApp.prototype.configure = function() {
        var deferredConfigure = $.Deferred(),
            self = this;

        this._tfModel = new SimpleModel({
            "placeholder": "Selected item is displayed in here.",
            "value": ""
        });

        optionsModel.on("model:init:completed", function(model) {
            model = new SimpleModel(model);
            model.set("title", "Simple dropdown title");

            deferredConfigure.resolve({
                "selector": "div[data-sid='sample-app']",
                "components": {
                    "ddDynamicOptions": {
                        "model": model,
                        "valueName": "id",
                        "textName": "attr2"
                    },
                    "tfSelectedOption": {
                        "model": self._tfModel
                    }
                }
            });
        });        

        optionsModel.trigger("model:init", {});

        return deferredConfigure.promise();
    };

    DropDownSampleApp.prototype.start = function() {
        var ddComponent = this.components.ddDynamicOptions,
            self = this;

        ddComponent.on("dd:selected-item", function(selectedItem) {
            console.log(selectedItem);

            self._tfModel.set("value", JSON.stringify(selectedItem));
        });
    };

    return DropDownSampleApp;
});