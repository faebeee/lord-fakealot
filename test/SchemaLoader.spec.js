const { resolve } = require('path');
const assert = require('assert');

const SchemaLoader = require('../src/SchemaLoader');
const Logger = require('../src/Logger');

const SOURCE = resolve('./test/interfaces');

describe('SchemaLoader', function() {
    it('loads all files from directory', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader._getFiles()
            .then((files) => {
                assert.equal(files.length, 4);
            });
    });
});
