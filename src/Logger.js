const QUIET = 0;
const ERROR = 1;
const INFO = 2;
const DEBUG = 3;

class Logger {
    /**
     *
     * @param {number} level
     * @param {string} tag
     */
    constructor(level = QUIET, tag) {
        this.level = level;
        this.tag = tag || 'App';
    }

    /**
     * Create new tagged instance
     * @param {string} tag
     * @return {Logger}
     */
    getTagged(tag) {
        return new Logger(this.level, tag);
    }

    /**
     * Logging an info statement
     * @param {*} data
     */
    info(...data) {
        if (this.level >= INFO) {
            console.info('INFO', this.tag, ...data);
        }
    }

    /**
     * Log a debug statement
     * @param {*} data
     */
    debug(...data) {
        if (this.level >= DEBUG) {
            console.debug('DEBUG', this.tag, ...data);
        }
    }

    /**
     * Log an error statement
     * @param {*} data
     */
    error(...data) {
        if (this.level >= ERROR) {
            console.error('ERROR', this.tag, ...data);
        }
    }
}

module.exports = Logger;
