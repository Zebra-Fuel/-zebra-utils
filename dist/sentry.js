"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configScope = exports.config = void 0;

var Sentry = require('@sentry/browser');

var _process$env$REACT_AP = process.env.REACT_APP_VERSION,
    REACT_APP_VERSION = _process$env$REACT_AP === void 0 ? 'unknown' : _process$env$REACT_AP;

var config = function config(configuration) {
  if (configuration.SENTRY_URL) {
    // eslint-disable-next-line no-console
    console.info("Setting up Sentry (".concat(REACT_APP_VERSION, ")..."));
    Sentry.init({
      dns: configuration.SENTRY_URL,
      release: REACT_APP_VERSION,
      environment: configuration.ENV
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('No SENTRY_URL set - skipping Sentry setup.');
  }
};

exports.config = config;

var configScope = function configScope(data) {
  return Sentry.configureScope(function (scope) {
    return scope.setUser(data);
  });
};

exports.configScope = configScope;