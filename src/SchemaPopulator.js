const faker = require('faker');
const jsf = require('json-schema-faker');

class SchemaPopulator {
    /**
     * DataGenerator
     * @param {number} fakerSeed
     */
    constructor(fakerSeed) {
        jsf.extend('faker', () => {
            faker.seed(fakerSeed);
            return faker;
        });
    }

    /**
     * Populate json schema with fake data
     * @param {object} schema
     * @return {object}
     */
    async populateData(schema) {
        return await jsf.resolve(schema);
    }
}

module.exports = SchemaPopulator;
