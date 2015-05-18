define(["jquery", "handlebars-lib"], function($, Handlebars) {
    Handlebars.registerHelper("getProperty", function(ctx, propertyName) {
        return ctx[propertyName];
    });

    return Handlebars;
});