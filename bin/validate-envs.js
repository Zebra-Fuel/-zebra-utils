#!/usr/bin/env node

const { REACT_APP_VERSION, SENTRY_ORG, SENTRY_PROJECT } = process.env;
const envs = { REACT_APP_VERSION, SENTRY_ORG, SENTRY_PROJECT };
const validateEnv = (key, value) => {
    if (!value) {
        // eslint-disable-next-line no-console
        console.error(`${key} not defined`);
        throw new Error(`${key} not defined`);
    }
};
Object.keys(envs).map(key => validateEnv(key, envs[key]));
