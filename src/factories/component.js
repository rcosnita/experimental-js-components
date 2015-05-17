define(["jquery", "utils/constants"], function($, Constants) {
    /**
     * @constructor
     * @public
     * @description
     * This class provides the foundation for each component available into framework.
     */
    function Component() {};

    /**
     * @constructor
     * @public
     * @description
     * This class provides the implementation for a plugin which can load custom components available.
     */
    function ComponentPlugin() {}

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically in order to load the specified module.
     */
    ComponentPlugin.prototype.load = function(name, req, onload, config) {
        var compPath = [Constants.COMPONENTS_FOLDER, "/", name, "/", Constants.COMPONENTS_CONTROLLER_FOLDER, "/", name]
            .join("");

        req([compPath], function(CompClass) {
            var comp = new CompClass();

            $.extend(comp, new Component());

            onload(comp);
        });
    };

    return new ComponentPlugin();
});