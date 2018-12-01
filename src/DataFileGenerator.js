const { getTypescriptFiles } = require('./util/getFiles');
const getInterfaceNameFromFile = require('./util/getInterfaceNameFromFile');
const isDir = require('./util/isDir');

class DataFileGenerator {
    /**
     *
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
     * @return {*}
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
     * @param out
     * @return {Promise<void>}
     */
    async generate(out) {
        const schemas = await this._getInterfaceSchemas();
        if (isDir(out)) {
            await this.dataWriter.writeFiles(out, schemas);
        } else {
            await this.dataWriter.writeFile(out, schemas);
        }
    }

    /**
     * Get all interfaces
     * @return {Promise<*>}
     * @private
     */
    async _getInterfaceSchemas() {
        const files = await this._getFiles();
        return files.reduce(async (acc, file) => {
            const interfaceName = getInterfaceNameFromFile(file);
            const schema = await this._generateDataForInterface(interfaceName);
            acc[interfaceName] = schema;
            return acc;
        }, {});
    }

    /**
     * Generate fakedata for interface schema
     * @param interfaceName
     * @return {Promise<*>}
     * @private
     */
    async _generateDataForInterface(interfaceName) {
        const schema = await this.schemaLoader.getSchema(interfaceName);
        return this.dataGenerator.populateData(schema);
    }
}

module.exports = DataFileGenerator;
