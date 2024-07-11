import config from './wdio.shared.local.appium.conf';
const path = require('path');
const fs = require('fs');
const data = fs.readFileSync(
	path.resolve('test/resources/json/caps-local.json'),
);
const jsonObject = JSON.parse(data);
// ============
// Specs
// ============
config.specs = [path.resolve('test/features/**/*.feature')];

// ============
// Capabilities
// ============
config.capabilities = [jsonObject];

exports.config = config;
