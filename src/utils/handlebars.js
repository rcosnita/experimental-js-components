define(["jquery", "handlebars-lib"], function($, Handlebars) {
    Handlebars.registerHelper("getProperty", function(ctx, propertyName) {
        if (ctx.isModel && ctx.isModel()) {
            return ctx.get(propertyName);
        }

        return ctx[propertyName];
    });

    return Handlebars;
});