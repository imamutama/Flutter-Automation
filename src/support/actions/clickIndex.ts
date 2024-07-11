import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';

const find = require('appium-flutter-finder');

/**
 * Perform an click action on the given element
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (index: number, selector: string) => {
	const { currentPage } = data;
	const page = pages[currentPage];
	await waitForDisplayed('text', page[selector], 3);
	const elementIndex = `//*[contains(@content-desc,'${selector}')][${index}]`;
	await $(elementIndex).click();

	if (!page[selector]) {
		throw new Error(
			`locator '${selector}' is not defined in page '${data.currentPage}'!`,
		);
	}
};
