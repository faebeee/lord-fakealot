const { getTypescriptFiles } = require('./util/getFiles');
const getInterfaceNameFromFile = require('./util/getInterfaceNameFromFile');

class DataFileGenerator {
    /**
     * DataFileGenerator
     * @param {string} sourceDir
     * @param {SchemaLoader} schemaLoader
     * @param {DataGenerator} dataGenerator
     * @param {SchemaDataWriter} dataWriter
     */
    constructor(sourceDir, schemaLoader, dataGenerator, dataWriter) {
        this.sourceDir = sourceDir;
        this.schemaLoader = schemaLoader;
        this.dataGenerator = dataGenerator;
        this.dataWriter = dataWriter;
        this.files = null;
    }

    /**
     * Load all .ts files
     * @return {Promise<string[]>}
     * @private
     */
    _getFiles() {
        if (this.files) {
            return Promise.resolve(this.files);
        }

        return getTypescriptFiles(this.sourceDir)
            .then(files => {
                this.files = files;
                return this.files;
            });
    }

    /**
     * Generate fakedata json files
     * @param {string} outDir directory or file where to store the data
     * @return {Promise<void>}
     */
    async generateFiles(outDir) {
        const schemas = await this._getInterfaceSchemas();
        await this.dataWriter.writeFiles(outDir, schemas);
    }

    /**
     * Generate fake data json file
     * @param {string} outFile Destination file
     * @return {Promise<void>}
     */
    async generateFile(outFile) {
        const schemas = await this._getInterfaceSchemas();
        await this.dataWriter.writeFile(outFile, schemas);
    }

    /**
     * Get all interfaces
     * @return {Promise<*>}
     * @private
     */
    async _getInterfaceSchemas() {
        const files = await this._getFiles();
        const acc = {};

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const interfaceName = getInterfaceNameFromFile(file);
            acc[interfaceName] = await this._generateDataForInterface(interfaceName);
        }
        return acc;
    }

    /**
     * Generate fakedata for interface schema
     * @param {string} interfaceName
     * @return {Promise<data>}
     * @private
     */
    async _generateDataForInterface(interfaceName) {
        const schema = await this.schemaLoader.getSchema(interfaceName);
        return await this.dataGenerator.populateData(schema);
    }
}

module.exports = DataFileGenerator;
