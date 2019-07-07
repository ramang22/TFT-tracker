exports.BUILD = BUILD = 'build';
exports.VERSION = VERSION = 'version';
exports.LOG_LEVEL = LOG_LEVEL = 'log_level';

const buildInfoMap = new Map();
// buildInfoMap[BUILD] = 'production';
buildInfoMap[BUILD] = 'dev';
buildInfoMap[VERSION] = '1.0';
buildInfoMap[LOG_LEVEL] = 'info';
exports.buildInfoMap = buildInfoMap;