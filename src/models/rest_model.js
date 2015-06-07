define(function() {
    /**
     * This class provides a special model which can integrate external data using rest apis.
     *
     * # Model events
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
     * define(["factories/model!simple_model", "factories/model!rest_model"], function(SimpleModel, RestModel) {
     *
     *  function App() { 
     *      this._customersModel = new RestModel({
     *          "url": "/webresources/api/v3/sites/current/customers",
     *          "name": "customers",
     *          "version": "v3"
     *      });
     *  };
     *
     *  App.prototype.configure = function() {
     *      var gridModel = new SimpleModel({
     *          "columns": [
     *              {"id": "customerId", "name": "Customer id"},
     *              {"id": "firstName", "name": "Customer first name"},
     *              {"id": "lastName", "name": "Customer last name"},
     *              {"id": "customer.address.street", "name": "Address street"}
     *          ],
     *          "items": this._customersModel
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
     *      this._customersModel.trigger("model:init", {});
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

    };

    return RestApiModel
});