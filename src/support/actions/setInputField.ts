import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';
import clickElements from './clickElements';
import tapBack from './tapBack';

/**
 * Set the value of an input field.
 * @param type - The type of the element (native or flutter).
 * @param text - The value to set.
 * @param selector - The selector of the element.
 * @throws {Error} If the element is not defined in the current page.
 */
export default async (
	type: 'native' | 'flutter',
	text: string,
	selector: any,
) => {
	const page = pages[data.currentPage];
	const element = page[selector];

	if (!element) {
		throw new Error(
			`Element '${selector}' is not defined in page '${data.currentPage}'!`,
		);
	}

	await clickElements(type, selector);

	switch (type) {
		case 'native':
			await $(element).setValue(text);
			break;
		case 'flutter':
			await driver.execute('flutter:setTextEntryEmulation', true, 5000);
			await driver.execute('flutter:enterText', text);
			break;
	}
};
