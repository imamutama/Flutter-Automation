import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';
const find = require('appium-flutter-finder');

/**
 * Clears the input field of the given type and selector.
 *
 * @param {string} type - The type of the element (link or selector).
 * @param {any} selector - The selector of the input field.
 */
export default async function clearInputField(
	type: 'native' | 'flutter',
	selector: string,
) {
	const currentPage = data.currentPage;
	const page = pages[currentPage];

	if (!(selector in page)) {
		throw new Error(
			`locator '${selector}' is not defined in page '${currentPage}'!`,
		);
	}

	await driver.switchContext(type === 'native' ? 'NATIVE_APP' : 'FLUTTER');
	await waitForDisplayed(type, page[selector], 3);

	const element =
		type === 'native'
			? await $(page[selector])
			: find.byValueKey(page[selector]);

	if (type === 'flutter') {
		await driver.elementClear(element);
	} else {
		await element.clear();
	}
}
