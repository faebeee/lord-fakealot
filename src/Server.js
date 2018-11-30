'use strict';

const Hapi = require('hapi');
const addCorsHeaders = require('./util/addCORSHeaders');

module.exports = class Server {
    constructor(port, host = 'localhost') {
        this.server = Hapi.server({
            port: port,
            host: host,
        });

        this.server.ext('onPreResponse', addCorsHeaders)

    }

    route(data) {
        this.server.route(data);
    }

    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }
};