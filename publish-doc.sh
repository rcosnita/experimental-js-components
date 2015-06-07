#!/bin/bash

################################################################################
#
# This script publish everything from doc folder into gh-pages branch. Documenation
# become available on http://rcosnita.github.io/experimental-js-components/
#
################################################################################


rm -Rf /tmp/experimental-js-components
mkdir /tmp/experimental-js-components

cp -R doc/* /tmp/experimental-js-components

git checkout gh-pages
rm -Rf *

cp -R /tmp/experimental-js-components/* doc

git push origin gh-pages