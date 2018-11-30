const { sample } = require('lodash');
const faker = require('faker');

module.exports = class DataCreator {

    populateData(jsonSchema) {
        const schemaString = JSON.stringify(jsonSchema);
        return JSON.parse(faker.fake(schemaString));
    }
    createForSchema(jsonSchema) {
        let data = jsonSchema;

        if (Array.isArray(jsonSchema)) {
            data = sample(jsonSchema);
        }

        return this.populateData(data);
    }
}