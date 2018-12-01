const jsf = require('json-schema-faker');

class DataGenerator {
    constructor(fakerSeed) {
        jsf.extend('faker', () => {
            const faker = require('faker');
            faker.seed(fakerSeed);
            return faker;
        });
    }

    populateData(schema) {
        return jsf.generate(schema);
    }
}

module.exports = DataGenerator;
