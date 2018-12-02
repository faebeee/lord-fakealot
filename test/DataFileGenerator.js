const { resolve } = require('path');
const {expect} = require('chai');

const DataFileGenerator = require('../src/DataFileGenerator');
const SchemaLoader = require('../src/typescript/SchemaLoader');
const DataGenerator = require('../src/typescript/DataGenerator');

const SOURCE = resolve('./test/interfaces');

describe('DataFileGenerator', function() {
    it('loads all files from directory', async () => {
        const dataFileGenerator = new DataFileGenerator(SOURCE, new SchemaLoader(SOURCE), new DataGenerator());
        return dataFileGenerator._getInterfaceSchemas()
            .then(allSchemas => {

                expect(allSchemas).to.have.property('ComplexInterface');
                expect(allSchemas).to.have.property('FakerInterface');

            });
    });
});
