define(["jquery"], function($) {
    /**
     * @constructor
     * @private
     * @description
     * This class provides the foundation for each application which is going to be created using the convention from this experiment.
     */
    function App() {}

    /**
     * @constructor
     * @public
     * @description
     * This plugin provides the requirejs plugin used to instantiate applications.
     */
    function AppPlugin() {}

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is invoked automatically in order to load the given plugin.
     */
    AppPlugin.prototype.load = function(name, req, onload, config) {
        req([name], function(LoadedApp) {
            app = new LoadedApp();

            $.extend(app, new App());

            onload(app);

            $(document).ready(function() {
                app.start();
            });            
        });
    };

    return new AppPlugin();
});