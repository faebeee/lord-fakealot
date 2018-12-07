const { writeFile } = require('fs');
const { mkdirp } = require('fs-extra');
const { dirname, format, join } = require('path');

class FileWriter {
    /**
     * Write files
     * @param {string} folder destination folder
     * @param {object} data populated json structure
     * @return {Promise<void>}
     */
    async writeFiles(folder, data) {
        const interfaceNames = Object.keys(data);
        for (let i = 0; i < interfaceNames.length; i++) {
            const interfaceName = interfaceNames[i];
            const interfaceData = data[interfaceName];
            const interfaceFile = format({ name: interfaceName, ext: `.json` });
            await this.writeFile(join(folder, interfaceFile), interfaceData);
        }
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
        });
    }
}

module.exports = FileWriter;
