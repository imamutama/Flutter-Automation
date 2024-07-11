import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import pause from '../actions/pause';
import waitForDisplayed from './waitForDisplayed';
const find = require('appium-flutter-finder');

/**
 * Checks if the element with the given type and selector exists or not.
 * @param type - The type of the element (text, native, or flutter).
 * @param method - The method to check (exist or not exist).
 * @param selector - The selector of the element.
 * @throws {Error} If the element is not defined in the current page.
 */
export default async (
	type: 'text' | 'native' | 'flutter',
	method: 'exist' | 'not exist',
	selector: string,
) => {
	const { currentPage } = data;
	const page = pages[currentPage];

	if (method === 'exist') {
		await waitForDisplayed(type, selector, 20);
	}

	const element =
		type === 'native'
			? $(page[selector])
			: type === 'flutter'
			? find.byValueKey(page[selector])
			: $("//*[contains(@content-desc,'" + selector + "')]");

	try {
		if (type === 'flutter') {
			if (method === 'exist') {
				await driver.execute('flutter:waitForTappable', element, 10000);
			} else {
				await driver.execute('flutter:waitForAbsent', element, 10000);
			}
		} else {
			const expectation =
				method === 'exist'
					? expect(element).toExist()
					: expect(element).not.toExist();
			await expectation;
		}
	} catch {
		throw new Error(
			`Locator '${selector}' is not defined in page '${currentPage}'!`,
		);
	}
};
