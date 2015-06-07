# Summary

This tutorial is especially useful for contributors who want to develop components which can be reused by other users. During this tutorial we are going to explain what is a component and which are the minimum requirements for each components contributed to framework.

# What is a component?

A component is a collection of views, controllers and models which provide reusable features. For instance:

* {@link UI/Components.Button}
* {@link UI/Components.DropDown}
* {@link UI/Components.DataGrid}

represent user interface components which can be used by someone who wants to create an application.

# Requirements for a new component?

When you want to create a new component you must follow the checklist presented below:

* What functionality does the component provide?
* Which are the events provided by the component?
* How can this component be configured?
* What is the look & feel of the component?

# Component lifecycle

Each component from framework has the following states in which it can be found:

1. Initialized
2. Configured
3. Started

# Button example

The complete source code for button example can be found at https://github.com/rcosnita/experimental-js-components/tree/master/src/components/button

## View

```html
<button type="button" class="btn btn-default" aria-label="Left Align">
    <span>{{model.label}}</span>
</button>
```

The button will simply display a label. Also the button is styled using bootstrap classes.

## Controller

```javascript
define(["jquery", "factories/view!button:index.html", "utils/constants", "bootstrap"], function($, view, Constants) {
    function Button() { 
        console.log("Button controller instantiated.");

        this.config = {
            "view": view
        };
    };

    Button.prototype.start = function() {
        var view = this.config.view,
            model = this.config.model,
            self = this;

        this._wireEvents();

        model.on(Constants.MODEL_PROPERTY_CHANGE_EVENT, function(changeData) {
            if (changeData.property !== "label") {
                return;
            }

            self.refresh();

            self._wireEvents();
        });
    };

    Button.prototype._wireEvents = function() {
        var view = this.config.view,
            self = this;

        $(view.element).find("button").click(function() {
            self.trigger(Constants.COMPONENT_BTN_CLICK_EVENT, {});
        });
    };

    return Button;
});
```

The button component wires everything during start phase. Moreover, the relation between the controller and button view is achieved during configuration phase in which button config receives button view as property.

The button component must be configured from outside (the app using the button) with a model which provides the button label.

For a concrete example about how to use the button component you can follow:

* {@link UI/Components.Button}
* {@tutorial create-first-app}