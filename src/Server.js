const Hapi = require('hapi');
const addCorsHeaders = require('./util/addCORSHeaders');

class Server {
    /**
     * Server
     * @param {number} port
     * @param {string} host
     * @param {Logger} logger
     */
    constructor(port, host = 'localhost', logger) {
        this.server = Hapi.server({
            port: port,
            host: host,
        });
        this.logger = logger.getTagged('Server');

        this.server.ext('onPreResponse', addCorsHeaders);
    }

    /**
     * Add route entry
     * @param {object} data
     */
    route(data) {
        this.server.route(data);
        this.logger.info(`Route: ${this.server.info.uri}${data.path}`);
    }

    /**
     * Start the server
     * @return {Promise<void>}
     */
    async start() {
        await this.server.start();
        this.logger.info(`Server running at: ${this.server.info.uri}`);
    }

    /**
     * Stop the server
     * @return {Promise<void>}
     */
    async stop() {
        await this.server.stop();
    }
}

module.exports = Server;
