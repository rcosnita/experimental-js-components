define(["jquery", "handlebars-lib"], function($, Handlebars) {
    /**
     * This method extracts a property from the given context. If property name identifies a method,
     * than the method is invoked and its result is returned to handlebars.
     * @param  {JSON} ctx The handlebars context used during rendering.
     * @param  {String} propertyName Identifies the property / function name which must be returned from the given context.
     * @return {Object} Returns the value of the specified property or the return result of the function identified by propertyName.
     */
    function getProperty(ctx, propertyName) {
        if (ctx.isModel && ctx.isModel()) {
            if (propertyName == "getData") {
                return ctx.getData();
            }

            return ctx.get(propertyName);
        }

        return ctx[propertyName];
    };

    /**
     * This method can create a property name into the given context by obtaining refObjProperty from refObj.
     * 
     * @param  {JSON} ctx The current context where we want to store the new property.
     * @param  {String} propertyName The new property we want to create.
     * @param  {JSON} refObj The object from where we want to obtain the refObjProperty value.
     * @param  {String} refObjProperty The name of the property we want to obtain from refObj and store into ctx.
     */
    function assign(ctx, propertyName, refObj, refObjProperty) {
        var propertyValue = getProperty(refObj, refObjProperty);

        ctx[propertyName] = propertyValue;
    };

    Handlebars.registerHelper("getProperty", getProperty);

    Handlebars.registerHelper("assign", assign);

    return Handlebars;
});