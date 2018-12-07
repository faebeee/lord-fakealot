const { resolve } = require('path');
const { expect } = require('chai');

const InterfacePopulator = require('../src/InterfacePopulator');
const SchemaLoader = require('../src/SchemaLoader');
const DataGenerator = require('../src/SchemaPopulator');
const Logger = require('../src/Logger');

const SOURCE = resolve('./test/interfaces');

describe('InterfacePopulator', function() {
    it('populate interface by given name', async () => {
        const interfacePopulator = new InterfacePopulator(new SchemaLoader(SOURCE, new Logger(), null), new DataGenerator());
        const populatedData = await interfacePopulator.populate('ComplexInterface');

        expect(populatedData).to.have.property('type');
        expect(populatedData).to.have.property('items');
    });
});
