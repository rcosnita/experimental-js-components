define(function() {
    return {
        /**
         * @constant {String} The relative components path shared by all global components.
         */
        COMPONENTS_FOLDER: "components",

        /**
         * @constant {String} The relative controllers folder name where components define custom controllers.
         */
        COMPONENTS_CONTROLLER_FOLDER: "controllers",

        /**
         * @constant {String} The relativew views folder name where components define custom views.
         */
        COMPONENTS_VIEW_FOLDER: "views",

        /**
         * @constant {String} The dom attribute name used to define component type.
         */
        COMPONENT_TYPE_ATTR_NAME: "data-comp-type",

        /**
         * @constant {String} The dom attribute name used to define a unique identifier.
         */
        COMPONENT_SID_ATTR_NAME: "data-comp-sid",

        /**
         * @constant {String} The model initialization event name.
         */
        MODEL_INIT_EVENT: "model:init",

        /**
         * @constant {String} The model init completed event name.
         */
        MODEL_INIT_COMPLETED_EVENT: "model:init:completed",

        /**
         * @constant {String} The button click event name.
         */
        COMPONENT_BTN_CLICK_EVENT: "btn:click",

        /**
         * @constant {String} The dropdopwn selected item event name.
         */
        COMPONENT_DD_ITEM_SELECTED: "dd:selected-item"
    };
});