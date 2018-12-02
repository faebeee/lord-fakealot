const { resolve } = require('path');
const test = require('unit.js');

const DataGenerator = require('../src/typescript/DataGenerator');
const SchemaLoader = require('../src/typescript/SchemaLoader');

const SOURCE = resolve('./test/interfaces');
const SEED = 6436364;

describe('DataGenerator', function() {
    it('Load custom annotations', () => {
        const schemaLoader = new SchemaLoader(SOURCE);
        return schemaLoader.getSchema('LangSwitch')
            .then((schema) => {
                const DEFAULT_LANGSWITCH_DEFINITION = {
                    'title': 'default',
                    'type': 'object',
                    'properties': {
                        'type': {
                            'description': 'Type definition',
                            'faker': 'lorem.paragraph',
                            'type': 'string',
                            'title': 'type'
                        },
                        'isActive': {
                            'description': 'Type definition',
                            'pattern': 'yes|no',
                            'type': 'string',
                            'title': 'isActive'
                        },
                        'languages': {
                            'type': 'array',
                            'items': {
                                '$ref': '#/definitions/ILink'
                            },
                            'title': 'languages'
                        }
                    },
                    'required': [
                        'isActive',
                        'languages',
                        'type'
                    ]
                };

                test.object(schema.definitions.default)
                    .is(DEFAULT_LANGSWITCH_DEFINITION);
            });
    });

    it('Populate data', async () => {
        const schemaLoader = new SchemaLoader(SOURCE);
        return schemaLoader.getSchema('LangSwitch')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                test.object(populatedData)
                    .hasProperty('languages');

                test.object(populatedData)
                    .hasProperty('type');

                test.object(populatedData)
                    .hasProperty('isActive');
            });
    });

    it('Populate complex data', async () => {
        const schemaLoader = new SchemaLoader(SOURCE);
        return schemaLoader.getSchema('ComplexInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                test.object(populatedData)
                    .hasProperty('items');

                test.object(populatedData)
                    .hasProperty('type');
            });
    });


    it('Populate complex multi file data', async () => {
        const schemaLoader = new SchemaLoader(SOURCE);
        return schemaLoader.getSchema('MultiFileInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                test.object(populatedData)
                    .hasProperty('langSwitch');

                test.object(populatedData.langSwitch)
                    .hasProperty('languages');

                test.object(populatedData)
                    .hasProperty('complex');

                test.object(populatedData)
                    .hasProperty('hello');
            });
    });

    it('Populate data with faker', async () => {
        const schemaLoader = new SchemaLoader(SOURCE);
        return schemaLoader.getSchema('FakerInterface')
            .then(async (schema) => {
                const dataGenerator = new DataGenerator(SEED);
                const populatedData = await dataGenerator.populateData(schema);

                test.object(populatedData)
                    .hasProperty('word');

                test.object(populatedData)
                    .hasProperty('finance');
            });
    });
});
