define(["jquery", "factories/view!form!index.html"], function($, view) {
    /**
     * # Summary
     *
     * Form components allow developers to quickly develop graphical user interfaces for managing resources (create / update).
     * By design, **Form** component is a container which provides only validation and wiring logic. The ui is actually
     * created by adding framework components within the form and giving set their **data-comp-sid** attribute to a model property name.
     * Using this convention, the form will always know how to map model to each component from the form.
     *
     * # Events
     *
     * Event name | Event body | Event description
     * -----------|------------|------------------
     * form:validate | | This event can be triggered by a form consumer in order to start form validation.
     * form:validate:completed | form model populated with values | This event is emitted by the form whenever the validation phase is finished.
     * form:submit:completed | form newly created model | This event is emitted by the form immediately after submit phase has been completed successfully.
     * 
     *
     * # Example
     *
     * ## Simple form for creating a new customer
     *
     * ```html
     * <div data-sid="sample-app">
     *     <div data-comp-sid="frmNewCustomer">
     *         <div data-comp-sid="firstName" data-comp-type="textfield"></div>
     *
     *         <div data-comp-sid="lastName" data-comp-type="textfield"></div>
     *
     *         <div data-comp-sid="btnCreate" data-comp-type="button" role="submit"></div> 
     *     </div>
     * </div>
     * ```
     *
     * ```javascript
     * define(["factories/model!rest_model:customers:v3:customers.json:new"], function(customerModel) {
     *     function SampleApp() { };
     *
     *     SampleApp.prototype.configure = function() {
     *         return {
     *              "selector": "div[data-sid='sample-app']",
     *              "components": {
     *                  "frmNewCustomer": {
     *                      "model": customerModel
     *                  }
     *              }
     *         }
     *     };
     *
     *     SampleApp.prototype.start = function() {
     *         var frm = this.components.frmNewCustomer;
     *
     *         frm.on("form:validate:completed", function(customerModel) {
     *             var deferredValidator = $.Deferred();
     *
     *             setTimeout(function() {
     *                 if (!customerModel.get("firstName")) {
     *                     deferredValidator.resolve({
     *                         "valid": false,
     *                         "field": "firstName",
     *                         "errors": [
     *                             "msg": "Customer first name is required."
     *                         ]
     *                     });
     *
     *                     return;
     *                 }
     *             }, 100);
     *
     *             return deferredValidator.promise();
     *         });
     *
     *         frm.on("form:submit:completed", function(customerModel) {
     *             console.log("Customer created successfully.");
     *         });
     *     };
     * 
     *     return SampleApp;
     * });
     * 
     * ```
     * 
     * @public
     * @class
     * @constructor
     * @extends UI/Components.Component
     * @memberof UI/Components
     */
    function Form() { };

    return Form;
});