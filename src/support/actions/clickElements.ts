import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';

const find = require('appium-flutter-finder');

/**
 * Perform an click action on the given element
 * @param {string} type - Type of the element (link or selector)
 * @param {string} selector - Element selector
 */
export default async (
	type: 'text' | 'native' | 'flutter',
	selector: string,
) => {
	const { currentPage } = data;
	const page = pages[currentPage];
	const selectType = type === 'text' ? selector : page[selector];

	await waitForDisplayed(type, selectType, 10);

	if (type === 'native') {
		if (!page[selector]) {
			throw new Error(
				`locator '${selector}' is not defined in page '${currentPage}'!`,
			);
		}
		await $(page[selector]).click();
	} else if (type === 'flutter') {
		if (!page[selector]) {
			throw new Error(
				`locator '${selector}' is not defined in page '${currentPage}'!`,
			);
		}
		await driver.execute(
			'flutter:clickElement',
			find.byValueKey(page[selector]),
			{
				timeout: 5000,
			},
		);
	} else {
		const xpath = `//*[contains(@content-desc,'${selector}')]`;
		await $(xpath).click();
	}
};
