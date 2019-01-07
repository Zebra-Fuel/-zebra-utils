function mockGoogleApi(address, lng, lat) {
    const location = {
        lng: jest.fn(() => lng),
        lat: jest.fn(() => lat),
    };
    const getPlacePredictions = jest.fn((_, autocompleteCallback) =>
        autocompleteCallback([{ structured_formatting: {}, description: address }]),
    );
    const geocode = jest.fn((_, callback) => callback([{ geometry: { location } }]));
    return {
        maps: {
            GeocoderStatus: {},
            Geocoder: jest.fn(() => ({ geocode })),
            places: {
                AutocompleteService: jest.fn(() => ({ getPlacePredictions })),
                PlacesServiceStatus: {},
            },
        },
    };
}

module.exports = mockGoogleApi;
