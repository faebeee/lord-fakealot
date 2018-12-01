class SchemaController {
    constructor(tsSchemaLoader, tsDataCreator) {
        this.interfaceSchemaLoader = tsSchemaLoader;
        this.dataCreator = tsDataCreator;
    }

    /**
     * Handle incoming requests
     * @param req
     * @return {Promise<*>}
     */
    async getData(req) {
        const schema = await this.interfaceSchemaLoader.getSchema(req.params.interface);
        return this.dataCreator.populateData(schema);
    }
}

module.exports = SchemaController;
