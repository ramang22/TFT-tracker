const buildInfo = require('../utils/buildInfo');

/**
 * @returns {logger}
 */
function getLogerType() {
    let log;
    switch (buildInfo.buildInfoMap[buildInfo.BUILD]) {
        case 'dev': {
            log = require('simple-node-logger').createSimpleLogger('project.log');
            break
        }
        case 'production': {
            log = require('simple-node-logger').createSimpleFileLogger('project.log');
            break
        }
        default: {
            throw new Error(`buildInfo has wrong format -> ${buildInfo.buildInfoMap[buildInfo.BUILD]}`)
        }
    }
    log.setLevel(buildInfo.LOG_LEVEL);
    return log;
}

exports.createLogger = getLogerType;