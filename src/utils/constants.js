define(function() {
    /**
     * @namespace  UI/Components/Constants
     */
    return {
        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENTS_FOLDER The relative components path shared by all global components.
         */
        COMPONENTS_FOLDER: "components",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENTS_CONTROLLER_FOLDER The relative controllers folder name where components define custom controllers.
         */
        COMPONENTS_CONTROLLER_FOLDER: "controllers",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENTS_VIEW_FOLDER The relativew views folder name where components define custom views.
         */
        COMPONENTS_VIEW_FOLDER: "views",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_TYPE_ATTR_NAME The dom attribute name used to define component type.
         */
        COMPONENT_TYPE_ATTR_NAME: "data-comp-type",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_SID_ATTR_NAME The dom attribute name used to define a component unique identifier.
         */
        COMPONENT_SID_ATTR_NAME: "data-comp-sid",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_INIT_EVENT The model initialization event name.
         */
        MODEL_INIT_EVENT: "model:init",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_INIT_COMPLETED_EVENT The model init completed event name.
         */
        MODEL_INIT_COMPLETED_EVENT: "model:init:completed",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_PROPERTY_CHANGE_EVENT The model property change event name.
         */
        MODEL_PROPERTY_CHANGE_EVENT: "model:change",

        /**
         * @memberof UI/Components/Constants
         * @constants {String} MODEL_VALIDATE_EVENT The model validate event name.
         */
        MODEL_VALIDATE_EVENT: "model:validate",

        /**
         * @memberof UI/Components/Constants
         * @constants {String} MODEL_VALIDATE_COMPLETED_EVENT The model validate completed event name.
         */
        MODEL_VALIDATE_COMPLETED_EVENT: "model:validate:completed",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_PROPERTY_VISIBLE The model property name where visible state is stored.
         */
        MODEL_PROPERTY_VISIBLE: "visible",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_INIT_FILTER_EVENT The model event used for triggering filtering. Not all provided models support this event.
         */
        MODEL_INIT_FILTER_EVENT: "model:filter:init",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} MODEL_INIT_FILTER_COMPLETED_EVENT This event is triggered by models which support filtering as response to a {@link UI/Components/Constants.MODEL_INIT_FILTER_EVENT} event.
         */
        MODEL_INIT_FILTER_COMPLETED_EVENT: "model:filter:completed",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_SHOW_EVENT The component show event name.
         */
        COMPONENT_SHOW_EVENT: "comp:show",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_HIDE_EVENT The component hide event name.
         */
        COMPONENT_HIDE_EVENT: "comp:hide",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_RELOAD_EVENT The component reload event name.
         */
        COMPONENT_RELOAD_EVENT: "comp:reload",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_VALIDATE_EVENT The component validate event name.
         */
        COMPONENT_VALIDATE_EVENT: "comp:validate",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_VALIDATE_COMPLETED_EVENT: The validate completed event name.
         */
        COMPONENT_VALIDATE_COMPLETED_EVENT: "comp:validate:completed",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_BTN_CLICK_EVENT The button click event name.
         */
        COMPONENT_BTN_CLICK_EVENT: "btn:click",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_DD_ITEM_SELECTED_EVENT The dropdopwn selected item event name.
         */
        COMPONENT_DD_ITEM_SELECTED_EVENT: "dd:selected-item",

        /**
         * @memberof UI/Components/Constants
         * @constant {String} COMPONENT_DATAGRID_ITEM_SELECTED_EVENT The datagrid selected item event name.
         */
        COMPONENT_DATAGRID_ITEM_SELECTED_EVENT: "datagrid:selected-row"
    };
});