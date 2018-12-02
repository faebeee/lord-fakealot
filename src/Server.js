'use strict';

const Hapi = require('hapi');
const addCorsHeaders = require('./util/addCORSHeaders');

module.exports = class Server {
    /**
     *
     * @param {number} port
     * @param {string} host
     */
    constructor(port, host = 'localhost') {
        this.server = Hapi.server({
            port: port,
            host: host,
        });

        this.server.ext('onPreResponse', addCorsHeaders)

    }

    /**
     * Add route entry
     * @param {object} data
     */
    route(data) {
        this.server.route(data);
        console.log(`Route: ${this.server.info.uri}${data.path}`);
    }

    /**
     * Start the server
     * @return {Promise<void>}
     */
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }
};
