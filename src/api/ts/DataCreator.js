const jsf = require('json-schema-faker');

module.exports = class DataCreator {
    populateData(schema) {
        return jsf.generate(schema);
    }
}