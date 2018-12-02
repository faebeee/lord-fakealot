const { getProgramFromFiles, buildGenerator } = require('typescript-json-schema');
const { getTypescriptFiles } = require('../util/getFiles');

const SETTINGS = {
    required: true,
    aliasRefs: true,
    titles: true,
    topRef: true,
    ref: true,
    ignoreErrors: false,
    validationKeywords: ['faker']
};

class SchemaLoader {

    /**
     *
     * @param {string} sourceDir
     */
    constructor(sourceDir) {
        this.sourceDir = sourceDir;
        /**
         *
         * @type {JsonSchemaGenerator}
         */
        this.generator = null;

        /**
         *
         * @type {ts.Program}
         */
        this.program = null;

        this._getFiles();
    }

    /**
     * Get all typescript files
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
     * Build the schemagenerator
     * @return {Promise<JsonSchemaGenerator>}
     * @private
     */
    _getGenerator() {
        if (this.generator) {
            return Promise.resolve(this.generator);
        }

        return this._getFiles()
            .then(() => {
                this.program = getProgramFromFiles(this.files, {
                    experimentalDecorators: true,
                    emitDecoratorMetadata: false,
                });
                this.generator = buildGenerator(this.program, SETTINGS);
                return this.generator;
            })
    }

    /**
     * Get a schema for an interfacename
     * @param {string} name
     * @returns {object}
     */
    getSchema(name) {
        return this._getGenerator()
            .then((generator) => {
                const schema = generator.getSchemaForSymbol(name, true);
                delete schema.$schema;
                return schema;
            })
    }
}

module.exports = SchemaLoader;
