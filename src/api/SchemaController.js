class SchemaController {
    /**
     * SchemaController
     *
     * @param {InterfacePopulator} interfacePopulator
     */
    constructor(interfacePopulator) {
        this.interfacePopulator = interfacePopulator;
    }

    /**
     * Handle incoming requests
     * @param {hapi.Request} req
     * @return {Promise<*>}
     */
    async getData(req) {
        try {
            return await this.interfacePopulator.populate(req.params.interface);
        } catch (e) {
            console.error(e);
            return e;
        }
    }
}

module.exports = SchemaController;
