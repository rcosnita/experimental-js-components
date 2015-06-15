define(["utils/constants"], function(Constants) {
    /**
     * This class provides a special model which can integrate external data using rest apis.
     *
     * # Model events
     *
     * This model supports all events inherited from {@link UI/Components/Models.Model}.
     *
     * # Examples
     *
     * This model is extremely useful for injecting data from external sources into components belonging to the framework.
     *
     * ## Display customers into a grid
     *
     * Let's assume we have a customers api which returns customers belonging to an online store:
     *
     * ```json
     * [
     * ...
     * {
     *     "customerId": 1,
     *     "firstName": "Radu",
     *     "lastName": "Cosnita"
     * },
     * ...
     * ]
     * ```
     *
     * Below you can find a simple example of how that api list data can be easily displayed in a datagrid component. 
     * Grid columns can be automatically ordered using the api.
     * 
     * ```javascript
     * define(["factories/model!simple_model", 
     *      "factories/model!rest_model:customers:v3:/webresources/api/v3/sites/current/customers"], 
     * function(SimpleModel, customersModel) {
     *
     *  function App() { };
     *
     *  App.prototype.configure = function() {
     *      var gridModel = new SimpleModel({
     *          "columns": [
     *              {"id": "customerId", "name": "Customer id"},
     *              {"id": "firstName", "name": "Customer first name"},
     *              {"id": "lastName", "name": "Customer last name"},
     *              {"id": "customer.address.street", "name": "Address street"}
     *          ],
     *          "items": customersModel
     *      });
     * 
     *      return {
     *          "selector": "div[data-sid='todo-app']",
     *          "components": {
     *              "grid-customers": {
     *                  "model": gridModel
     *              }
     *          }
     *      };
     *  };
     *
     *  App.prototype.start = function() {
     *      customersModel.trigger("model:init", {});
     *  };
     * 
     *  return App;
     * });
     * ```
     *
     * @public
     * @constructor
     * @param {Object} apiConfig Api configuration used to describe the api this model will integrate.
     * @param {String} apiConfig.url The url of the api integrated by this model.
     * @param {String} apiConfig.name The name of the api integrated by this model.
     * @param {String} apiConfig.version The version of the api integrated by this model.
     * @memberof UI/Components/Models
     * @extends UI/Components/Models.Model
     */
    function RestApiModel(apiConfig) {
          this._modelConfig = apiConfig;

          this.__wireCommonEvents();
          this._wireInitEvents();
          this._wireFilteringEvent();
    };

    /**
     *
     * 
     * @public
     * @method
     * @return [JSON] A json object containing the items array and total items count available within the current model.
     * Not all data is actually available in this model. 
     */
    RestApiModel.prototype.getData = function() {
          return this._json || {"items": [], "totalItemsCount": 0};
    };

    /**
     * This method wires the initialization event. Initialization event triggers an ajax request for obtaining the actual data.
     * Once it finishes loading the data it notifies all subscribers about the completed state.
     */
    RestApiModel.prototype._wireInitEvents = function() {
          var self = this;

          this.on(Constants.MODEL_INIT_EVENT, function() {
               var url = self._modelConfig.url;

               console.log("Loading the current model data: " + url);

               var response = $.ajax({"url": url, "type": "get", "contentType": "application/json"});

               response.then(function(data) {
                    self._json = data;

                    self.trigger(Constants.MODEL_INIT_COMPLETED_EVENT, self._json);
               });
          });
    };

    /**
     * This method is used to wire filtering events to this model.
     */
    RestApiModel.prototype._wireFilteringEvent = function() {
          var self = this;

          this.on(Constants.MODEL_INIT_FILTER_EVENT, function(filter) {
               var model = self._nonFilteredJson ? self._nonFilteredJson.items : self.getData().items,
                    results = [];

               for (var rowIdx = 0; rowIdx < model.length; rowIdx++) {
                    var row = model[rowIdx];

                    for (var keyName in filter) {
                         if (row[keyName] && row[keyName].toLowerCase().indexOf(filter[keyName].toLowerCase()) > -1 || filter[keyName] == "") {
                              results.push(row);
                         }
                    }
               }

               if (!self._nonFilteredJson) {
                    self._nonFilteredJson = {"items": self._json.items, "totalItemsCount": self._json.totalItemsCount};
               }

               self._json.items = results;

               self.trigger(Constants.MODEL_INIT_FILTER_COMPLETED_EVENT, self._json);
          });
    };

    return RestApiModel;
});