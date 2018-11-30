module.exports = class SchemaController {
    constructor(jsonSchemaLoader, jsonDataCreator) {
        this.interfaceSchemaLoader = jsonSchemaLoader;
        this.dataCreator = jsonDataCreator;
    }

    async getData(req) {
        const schema = await this.interfaceSchemaLoader.getSchema(req.params.interface);
        return this.dataCreator.createForSchema(schema);
    }
}