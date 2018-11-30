module.exports = class SchemaController {
    constructor(tsSchemaLoader, tsDataCreator) {
        this.interfaceSchemaLoader = tsSchemaLoader;
        this.dataCreator = tsDataCreator;
    }

    async getData(req) {
        const schema = await this.interfaceSchemaLoader.getSchema(req.params.interface);
        return schema;
        return this.dataCreator.populateData(schema);
    }
}