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
    constructor(sourceDir) {
        this.sourceDir = sourceDir;
        this.generator = null;
        this.program = null;

        this._getFiles();
    }

    /**
     *
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
     *
     * @return {*}
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
     *
     * @param name
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
