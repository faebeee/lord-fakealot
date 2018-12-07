class InterfacePopulator {
    constructor(interfaceSchemaLoader, dataCreator) {
        this.interfaceSchemaLoader = interfaceSchemaLoader;
        this.dataCreator = dataCreator;
    }

    /**
     * Get populated data for interface
     * @param {string} interfaceName
     * @return {Promise<*>}
     */
    async populate(interfaceName) {
        const schema = await this.interfaceSchemaLoader.getSchema(interfaceName);
        return await this.dataCreator.populateData(schema);
    }
}

module.exports = InterfacePopulator;
