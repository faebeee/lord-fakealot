class SchemaController {
    /**
     * SchemaController
     * @param {SchemaLoader} tsSchemaLoader
     * @param {DataGenerator} tsDataCreator
     */
    constructor(tsSchemaLoader, tsDataCreator) {
        this.interfaceSchemaLoader = tsSchemaLoader;
        this.dataCreator = tsDataCreator;
    }

    /**
     * Handle incoming requests
     * @param {hapi.Request} req
     * @return {Promise<*>}
     */
    async getData(req) {
        try {
            const schema = await this.interfaceSchemaLoader.getSchema(req.params.interface);
            return await this.dataCreator.populateData(schema);
        } catch (e) {
            return e;
        }
    }
}

module.exports = SchemaController;
