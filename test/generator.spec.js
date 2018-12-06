const { resolve } = require('path');
const { existsSync } = require('fs');
const { expect } = require('chai');
const generator = require('../generator');

describe('Generator', function() {
    it('create files', async () => {
        await generator(resolve('test/interfaces'), null, resolve('test/out'), null);
        const exists = existsSync(resolve('test/out/ComplexInterface.json'));
        expect(exists).to.be.equal(true);
    });

    it('create file', async () => {
        await generator(resolve('test/interfaces'), null, null, resolve('test/out/all.json'));
        const exists = existsSync(resolve('test/out/all.json'));
        expect(exists).to.be.equal(true);

        const allJsonData = require(resolve('test/out/all.json'));
        expect(allJsonData).to.have.property('ComplexInterface');
        expect(allJsonData).to.have.property('FakerInterface');
        expect(allJsonData).to.have.property('LangSwitch');
    });
});
