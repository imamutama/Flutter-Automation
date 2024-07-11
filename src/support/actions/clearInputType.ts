import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';
const find = require('appium-flutter-finder');

/**
 * Clears the text of a Flutter element identified by two selectors.
 * @param selector1 - The type of the first selector.
 * @param selector2 - The type of the second selector.
 * @throws An error if the element is not found.
 */
export default async function clearInputType(
	selector1: string,
	selector2: string,
): Promise<void> {
	const element = find.descendant({
		of: find.byType(selector1),
		matching: find.byType(selector2),
		firstMatchOnly: true,
	});

	await driver.switchContext('FLUTTER');
	await driver.elementClick(element);
	await driver.pause(1000);
	await driver.elementClear(element);

	if (!(await driver.isElementDisplayed(element))) {
		throw new Error(
			`Element not found: ${selector1} and ${selector2} on page ${data.currentPage}`,
		);
	}
}
