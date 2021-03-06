const { resolve } = require('path');
const { expect } = require('chai');
const assert = require('assert');

const DataGenerator = require('../src/SchemaPopulator');
const SchemaLoader = require('../src/SchemaLoader');
const Logger = require('../src/Logger');

const SOURCE = resolve('./test/interfaces');
const SEED = 6436364;

describe('DataGenerator', function() {
    it('Load custom annotations', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader.getSchema('LangSwitch')
            .then((schema) => {
                const DEFAULT_LANGSWITCH_DEFINITION = {
                    title: 'LangSwitch',
                    type: 'object',
                    properties: {
                        type: {
                            description: 'Type definition',
                            faker: 'lorem.paragraph',
                            type: 'string',
                            title: 'type',
                        },
                        isActive: {
                            description: 'Type definition',
                            pattern: 'yes|no',
                            type: 'string',
                            title: 'isActive',
                        },
                        languages: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/ILink',
                            },
                            title: 'languages',
                        },
                    },
                    required: [
                        'isActive',
                        'languages',
                        'type',
                    ],
                };

                assert.equal(JSON.stringify(schema.definitions.LangSwitch), JSON.stringify(DEFAULT_LANGSWITCH_DEFINITION));
            });
    });

    it('Populate data', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader.getSchema('LangSwitch')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                expect(populatedData).to.have.property('languages');
                expect(populatedData).to.have.property('type');
                expect(populatedData).to.have.property('isActive');
            });
    });

    it('Populate complex data', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader.getSchema('ComplexInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                expect(populatedData).to.have.property('items');
                expect(populatedData).to.have.property('type');
            });
    });


    it('Populate complex multi file data', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader.getSchema('MultiFileInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                expect(populatedData).to.have.property('langSwitch');
                expect(populatedData.langSwitch).to.have.property('languages');
                expect(populatedData).to.have.property('complex');
                expect(populatedData).to.have.property('hello');
            });
    });

    it('Populate data with faker', () => {
        const schemaLoader = new SchemaLoader(SOURCE, new Logger());
        return schemaLoader.getSchema('FakerInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                expect(populatedData).to.have.property('word');
                expect(populatedData).to.have.property('finance');
            });
    });
});
