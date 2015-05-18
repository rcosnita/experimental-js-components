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
            "selector": "div[data-sid='todo-app']"
        };
    };

    /**
     * @public
     * @instance
     * @description
     * This method is invoked automatically when application starts.
     */
    TodoApp.prototype.start = function() { 
        this.components["btn-refresh"].bind("click", function() {
            alert("Works as a charm.");
        });
    };

    return TodoApp;
});