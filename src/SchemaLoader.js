const { getProgramFromFiles, buildGenerator } = require('typescript-json-schema');
const { getTypescriptFiles } = require('./util/getFiles');
const { resolve } = require('path');

const SETTINGS = {
    required: true,
    aliasRefs: true,
    titles: true,
    topRef: true,
    ref: true,
    ignoreErrors: false,
    validationKeywords: ['faker'],
};

class SchemaLoader {
    /**
     * SchemaLoader
     * @param {string} sourceDir
     * @param {Logger} logger
     */
    constructor(sourceDir, logger, tsconfig) {
        this.sourceDir = sourceDir;
        this.tsconfig = tsconfig;

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

        this.logger = logger.getTagged('SchemaLoader');
        this.logger.debug(`Source: ${sourceDir}`);
        this.logger.debug(`tsconfig: ${tsconfig}`);

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
                this.logger.info(`Loaded ${files.length} files`);

                files.map((file) => {
                    this.logger.debug(`Loaded ${file}`);
                    return file;
                });
                return this.files;
            });
    }

    /**
     * Build the schema generator
     * @return {Promise<JsonSchemaGenerator>}
     * @private
     */
    _getGenerator() {
        if (this.generator) {
            return Promise.resolve(this.generator);
        }

        return this._getFiles()
            .then(() => {
                this.logger.debug(`Building program`);

                let compilerSettings = {};

                if (this.tsconfig) {
                    const tsconfigData = require(resolve(this.tsconfig));
                    compilerSettings = tsconfigData.compilerOptions;
                }

                this.program = getProgramFromFiles(this.files, compilerSettings);
                this.logger.debug(`Building generator`);
                this.generator = buildGenerator(this.program, SETTINGS);
                return this.generator;
            });
    }

    /**
     * Get a schema for an interfacename
     * @param {string} name
     * @return {object}
     */
    getSchema(name) {
        this.logger.debug(`Getting schema for ${name}`);
        return this._getGenerator()
            .then((generator) => {
                if (!generator) {
                    this.logger.error('No generator has been built');
                    return null;
                }
                const schema = generator.getSchemaForSymbol(name, true);
                delete schema.$schema;
                return schema;
            });
    }
}

module.exports = SchemaLoader;
