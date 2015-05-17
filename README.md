# Summary

This repository presents an experimental approach for developing MVC javascript applications which work well with any framework available on the market.

The experiment enforces only a set of rules / guidelines + an IoC container which makes development really easy. Moreover, this expemeriment takes into consideration TDD, unit testing and integration testing capabilities which are sometime forgotten when writting javascript code.

# Architecture overview

## Component

In this experiment development is based on components. A component is composed of:

* Models
* Controllers
* Views
* Standardized events (which describe component capabilities).

A component can also consume other components but can rely only on the standardized events. All other layers of a component (models, views) must be considered internal implementation details.

In order to understand what a component provides it should be necessary only to understand which are the events provided by the component.