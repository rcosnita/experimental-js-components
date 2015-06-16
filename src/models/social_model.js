/**
 * @namespace UI/Components/Models/Social
 */
define(["utils/constants"], function(Constants) {
   /**
    * # Summary
    * 
    * Social model provides a convenient integration point with major social network providers:
    *
    * * Linkedin ([Profile api](https://developer.linkedin.com/docs/fields/full-profile))
    * * Facebook ([Profile api](https://developers.facebook.com/docs/graph-api/reference/user))
    * * Github ([Profile api](https://developer.github.com/v3/users/))
    *
    * Behind the scenes, the social model orchestrates the OAuth 2 flows for each individual social provider.
    * In the end the model will give developer access to the social profile as well as to the underlining social provider access token.
    *
    * # Events
    *
    * Event name | Event body | Event description
    * -----------|------------|------------------
    * model:init:completed | {[social profile model specific to each provider], "security": {"accessToken": "Bearer ...."}} | This event is emitted by every social model once the initial requested action has been completed.
    * 
    * # Example
    *
    * ```html
    * <div data-sid="sample-app">
    *     <div data-comp-sid="tfFirstName" data-comp-type="textfield"></div>
    *
    *     <div data-comp-sid="tfLastName" data-comp-type="textfield"></div>
    * </div>
    * ```
    * 
    * ```javascript
    * define(["factories/model!simple_model",
    *     "factories/model!social_model:facebook:v1:profile"], function(SimpleModel, facebookModel) {
    *     function SampleApp() { 
    *         this._firstNameModel = new SimpleModel();
    *         this._lastNameModel = new SimpleModel();
    *     };
    *
    *     SampleApp.prototype.configure = function() {
    *         return {
    *              "tfFirstName": {
    *                  "model": this._firstNameModel
    *              },
    *              "tfLastName": {
    *                  "model": this._lastNameModel
    *              }
    *         };
    *     };
    *
    *     SampleApp.prototype.start = function() {
    *         var self = this;
    *
    *         facebookModel.on("model:init:completed", function(profile) {
    *             self._firstNameModel.set("value", profile.get("firstName"));
    *             self._lastNameModel.set("value", profile.get("lastName"));
    *         });
    *     };
    * });
    * ``` 
    *
    *
    * @public
    * @class
    * @constructor
    * @memberof UI/Components/Models/Social
    * @extends UI/Components/Models.Model
    */
   function SocialModel() { };

   return SocialModel;
});