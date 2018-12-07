const { resolve } = require('path');
const { expect } = require('chai');

const FileGenerator = require('../src/FileGenerator');
const SchemaLoader = require('../src/SchemaLoader');
const DataGenerator = require('../src/SchemaPopulator');
const Logger = require('../src/Logger');

const SOURCE = resolve('./test/interfaces');

describe('DataFileGenerator', function() {
    it('loads all files from directory', () => {
        const dataFileGenerator = new FileGenerator(SOURCE, new SchemaLoader(SOURCE, new Logger()), new DataGenerator(), null, new Logger());
        return dataFileGenerator._getInterfaceSchemas()
            .then(allSchemas => {
                expect(allSchemas).to.have.property('ComplexInterface');
                expect(allSchemas).to.have.property('FakerInterface');
            });
    });
});
