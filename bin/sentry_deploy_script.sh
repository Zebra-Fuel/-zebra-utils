#!/bin/bash

sentry-cli releases set-commits --auto $REACT_APP_VERSION
sentry-cli releases files $REACT_APP_VERSION upload-sourcemaps ./build/static/js/* --url-prefix '~/static/js' --no-rewrite
sentry-cli releases deploys $REACT_APP_VERSION new -e $NODE_ENV
