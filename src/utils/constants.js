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
         * @constant {String} The dom attribute name used to define component type.
         */
        COMPONENT_TYPE_ATTR_NAME: "data-comp-type",

        /**
         * @constant {String} The dom attribute name used to define a unique identifier.
         */
        COMPONENT_SID_ATTR_NAME: "data-comp-sid"
    };
});