import { config as configDotEnv } from 'dotenv';
import { removeSync } from 'fs-extra';
const allure = require('allure-commandline');
const { generate } = require('multiple-cucumber-html-reporter');
const fs = require('fs');

export const config: WebdriverIO.Config = {
	//
	// ====================
	// Runner Configuration
	// ====================
	runner: 'local',
	//
	// ==================
	// Specify Test Files
	// ==================
	// NOTE: This is just a place holder and will be overwritten by each specific configuration
	specs: [],
	//
	// ============
	// Capabilities
	// ============
	// NOTE: This is just a place holder and will be overwritten by each specific configuration
	capabilities: [],
	//
	// ===================
	// Test Configurations
	// ===================
	logLevel: 'debug',
	bail: 0,
	waitforTimeout: 60 * 1000,
	connectionRetryTimeout: 65 * 1000,
	connectionRetryCount: 1,
	services: [],
	framework: 'cucumber',
	reporters: [
		'spec',
		'cucumberjs-json',
		[
			'allure',
			{
				outputDir: 'allure-results',
				disableWebdriverStepsReporting: true,
				disableWebdriverScreenshotsReporting: false,
				useCucumberStepReporter: true,
			},
		],
	],
	cucumberOpts: {
		// CucumberOption's timeout should be at least 5s longer than WDIO's waitforTimeout
		timeout: 65 * 1000,
		require: ['./src/step-definitions/**/*.ts'],
		backtrace: true,
	},

	//
	// =====
	// Hooks
	// =====
	// Gets executed before config execution begins.
	before: () => {
		configDotEnv();
	},

	// Gets executed after a Cucumber Scenario.
	afterScenario: async (world, result) => {
		if (!result.passed) {
			await driver.switchContext('FLUTTER');
			await driver.reset();
		}
		await driver.switchContext('FLUTTER');
		await driver.reset();
	},
	//afterStep: async function (
	//  step,
	//  scenario,
	//  { error, duration, passed },
	// context
	//) {
	//   if (error) {
	//    await browser.takeScreenshot();
	//  }
	//},
	afterFeature: async function () {
		const data = `Environment=${process.env.ENVIRONMENT}\nPlatform=${process.env.OS_PLATFORM}\nVersion=${process.env.OS_VERSION}\nNode-Version=${process.version}`;
		fs.writeFile(
			'allure-results/environment.properties',
			data,
			(err: any) => {
				if (err) throw err;
			},
		);
	},
	// Gets executed once before all workers get launched.
	onPrepare: () => {
		removeSync('.tmp/');
	},
	// Gets executed after all workers got shut down and the process is about to exit.
	async onComplete() {
		generate({
			jsonDir: '.tmp/json/',
			reportPath: '.tmp/report/',
			pageTitle: 'SuperApps Mobile HTML Reporter',
			reportName: 'SuperApps Mobile HTML Reporter',
			displayDuration: true,
			displayReportTime: true,
		});
		const reportError = new Error('Could not generate Allure report');
		const generation = allure(['generate', 'allure-results', '--clean']);
		return new Promise((resolve, reject) => {
			const generationTimeout = setTimeout(
				() => reject(reportError),
				5000,
			);

			generation.on('exit', function (exitCode: number) {
				clearTimeout(generationTimeout);

				if (exitCode !== 0) {
					return reject(reportError);
				}
				console.log('Allure report successfully generated');
				resolve();
			});
		});
	},
};
