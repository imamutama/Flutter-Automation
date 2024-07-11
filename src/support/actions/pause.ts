/**
 * Pause execution for a given number of milliseconds
 * @param  {String}   ms   Number of milliseconds to pause
 */
export default async (ms: number) => {
	/**
	 * Number of milliseconds
	 * @type {Int}
	 */

	// eslint-disable-next-line wdio/no-pause
	await driver.pause(ms * 1000);
};
