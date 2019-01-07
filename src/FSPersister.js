const _ = require('lodash');
const ParentFSPersister = require('@pollyjs/persister-fs');

module.exports = class FSPersister extends ParentFSPersister {
    static get name() {
        return 'fs';
    }

    saveRecording(recordingId, data) {
        /*
            Pass the data through the base persister's stringify method so
            the output will be consistent with the rest of the persisters.
        */
        const { log } = data;
        log.entries = _.sortBy(log.entries, ['request.url', 'request.postData.text', '_id']).map(
            v => ({
                ..._.omit(v, ['startedDateTime', 'time']),
                timings: _.omit(v.timings, ['wait']),
            }),
        );
        this.api.saveRecording(recordingId, JSON.parse(this.stringify(data)));
    }
};
