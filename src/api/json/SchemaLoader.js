const getFiles = require('../../util/getFiles');
const {basename} = require( 'path');

module.exports = class JsonSchemaLoader {
    constructor(sourceDir) {
        this.sourceDir = sourceDir;
        this.index = {};
        
        getFiles(this.sourceDir)
            .then( (files) => {
                this.files = files;
                this.files.forEach((file) => {
                    this.index[basename(file, '.json')] = file;
                });
            });
    }

    getSchema(name) {
        const schema = require(this.index[name]);
        return schema;
    }
}