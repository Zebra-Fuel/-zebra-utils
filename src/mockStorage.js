function mockStorage() {
    let storage = {};
    return {
        setItem: jest.fn((k, v) => {
            storage[k] = String(v);
        }),
        getItem: jest.fn(k => storage[k]),
        clear: jest.fn(() => {
            storage = {};
        }),
    };
}

module.exports = mockStorage;
