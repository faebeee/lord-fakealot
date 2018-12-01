const { writeFile } = require('fs');
const { mkdirp } = require('fs-extra');
const { dirname } = require('path');

class SchemaDataWriter {
    writeFiles(folder, data) {

    }

    /**
     * Write all schemas into a single file
     * @param {string} file
     * @param {object} data
     * @return {Promise<*>}
     */
    async writeFile(file, data) {
        const content = JSON.stringify(data);
        await mkdirp(dirname(file));

        return new Promise((res, rej) => {
            writeFile(file, content, (err) => {
                if (err) {
                    return rej(err);
                }

                return res();
            });
        })
    }

}

module.exports = SchemaDataWriter;
