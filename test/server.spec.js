const { resolve } = require('path');
const { expect } = require('chai');
const request = require('request');

const server = require('../server');

describe('Server', function() {
    it('expose api', async () => {
        const container = await server(resolve('test/interfaces'), 8080);

        request.get('http://localhost:8080/api/ComplexInterface', { json: true }, (err, res, body) => {
            expect(body).to.have.property('type');
            expect(body).to.have.property('items');

            container.get('service.server').stop();
        });
    });
});
