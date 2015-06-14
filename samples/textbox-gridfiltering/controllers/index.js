define(["factories/model!simple_model", "factories/model!rest_model", "utils/constants"], 
    function(SimpleModel, RestModel, Constants) {
    /**
     * This class provides the controller for quick search application. The goal of this app is to show
     * how to add datagrid quick filtering based on a textbox input component.
     * 
     * @constructor
     * @public
     */
    function QuickSearchApp() { 
        this._customersModel = new RestModel({
            "url": "../customers.json",
            "name": "customers",
            "version": "v3"
        });

        this._filterModel = new SimpleModel({
            "value": "",
            "placeholder": "Type your search here."
        });
    };

    /**
     * This method is invoked automatically by the framework in order to configure the application components.
     */
    QuickSearchApp.prototype.configure = function() {
        return {
            "selector": "div[data-sid='quicksearch-app']",
            "components": {
                "tf-fulltextfilter": {
                    "model": this._filterModel
                },
                "grid-customers": {
                    "model": new SimpleModel({
                        "columns": [
                            {"id": "customerId", "name": "Id"},
                            {"id": "firstName", "name": "First name"},
                            {"id": "lastName", "name": "Last name"}
                        ],
                        "items": this._customersModel
                    })
                }
            }
        };
    };

    /**
     * This method is invoked automatically when all dom elements were loaded and app is ready to start.
     */
    QuickSearchApp.prototype.start = function() { 
        var self = this;

        this._filterModel.on(Constants.MODEL_PROPERTY_CHANGE_EVENT, function(evt) {
            if (evt.property != "value") {
                return;
            }

            self._customersModel.trigger(Constants.MODEL_INIT_FILTER_EVENT, {"firstName": evt.newValue});
        });
    };

    return QuickSearchApp;
});