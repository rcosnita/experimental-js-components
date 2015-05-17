define(function() {
    /**
     * @constructor
     * @public
     * @description
     * This is the TodoApp constructor used to start the application.
     */
    function TodoApp() {
        console.log("Todo App instantiated.");

        this.config = {
            "selector": "div[data-sid='todo-app']",
            "components": {
                "btn-refresh": {}
            }
        };
    };

    /**
     * @public
     * @instance
     * @description
     * This method is invoked automatically when application starts.
     */
    TodoApp.prototype.start = function() { };

    return TodoApp;
});