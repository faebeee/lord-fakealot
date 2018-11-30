const { getProgramFromFiles, buildGenerator } = require('typescript-json-schema');
const getFiles = require('../../util/getFiles');
const { join } = require('path');

const SETTINGS = {
    required: true,
    aliasRefs: true,
    titles: true,
    topRef: true,
    ref: true,
    ignoreErrors: false
};

module.exports = class SchemaLoader {
    constructor(sourceDir) {
        this.sourceDir = sourceDir;
        this.generator = null;
        this.program = null;

        getFiles(join(this.sourceDir, '**/*.ts'))
            .then((files) => {
                this.files = files;
                this.createProgram();
            });
    }

    createProgram() {
        this.program = getProgramFromFiles(this.files, {
            experimentalDecorators: true,
            emitDecoratorMetadata: false,
        });
        this.generator = buildGenerator(this.program, SETTINGS);
    }

    getSchema(name) {
        if (!this.generator) {
            this.createProgram();
        }

        try {
            const schema = this.generator.getSchemaForSymbol(name, true);
            delete schema.$schema;
            return schema;
        } catch (err) {
            console.error(err);
        }
    }
}