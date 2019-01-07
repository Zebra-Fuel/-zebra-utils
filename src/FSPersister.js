const _sortBy = require('lodash/sortBy');
const _omit = require('lodash/omit');
const ParentFSPersister = require('@pollyjs/persister-fs');

class FSPersister extends ParentFSPersister {
    static get name() {
        return 'fs';
    }

    saveRecording(recordingId, data) {
        /*
            Pass the data through the base persister's stringify method so
            the output will be consistent with the rest of the persisters.
        */
        const { log } = data;
        log.entries = _sortBy(log.entries, ['request.url', 'request.postData.text', '_id']).map(
            v => ({
                ..._omit(v, ['startedDateTime', 'time']),
                timings: _omit(v.timings, ['wait']),
            }),
        );
        this.api.saveRecording(recordingId, JSON.parse(this.stringify(data)));
    }
}

module.exports = FSPersister;
