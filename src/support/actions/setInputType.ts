import data from '../../helpers/data';
import { pages } from '../../pages/pages';

const find = require('appium-flutter-finder');

/**
 * Enters text into a Flutter element identified by two selectors.
 * @param text - The text to enter.
 * @param selector1 - The type of the first selector.
 * @param selector2 - The type of the second selector.
 * @throws {Error} If the element is not defined in the page.
 */
export default async (text: string, selector1: string, selector2: string) => {
	const { currentPage } = data;
	const page = pages[currentPage];

	try {
		await driver.switchContext('FLUTTER');
		const element = find.descendant({
			of: find.byType(page[selector1]),
			matching: find.byType(page[selector2]),
			firstMatchOnly: true,
		});
		await driver.elementClick(element);
		await driver.execute('flutter:enterText', text);
	} catch {
		throw new Error(
			`Element '${selector1}' and ${selector2} is not defined in page '${currentPage}'!`,
		);
	}
};
