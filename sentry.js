/* eslint-disable node/no-unsupported-features/es-syntax */
const Sentry = require('@sentry/browser');

export const config = ({ SENTRY_URL, ENV, REACT_APP_VERSION = 'unknown' }) => {
    if (SENTRY_URL) {
        // eslint-disable-next-line no-console
        console.info(`Setting up Sentry (${REACT_APP_VERSION})...`);
        Sentry.init({
            dsn: SENTRY_URL,
            maxBreadcrumbs: 50,
            release: REACT_APP_VERSION,
            environment: ENV,
        });
    } else {
        // eslint-disable-next-line no-console
        console.warn('No SENTRY_URL set - skipping Sentry setup.');
    }
};

export const configScope = data => Sentry.configureScope(scope => scope.setUser(data));

export const sdk = Sentry;
