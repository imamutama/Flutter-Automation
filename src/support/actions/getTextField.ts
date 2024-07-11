import { byValueKey } from 'appium-flutter-finder';
import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import waitForDisplayed from '../checks/waitForDisplayed';

const getElementText = (type: 'native' | 'flutter', selector: string) => {
	const { currentPage } = data;
	const page = pages[currentPage];
	if (type === 'native') {
		return $(page[selector]).getText();
	}
	return driver.getElementText(byValueKey(page[selector]));
};

export default async (type: 'native' | 'flutter', selector: string) => {
	const { currentPage } = data;
	const page = pages[currentPage];
	await waitForDisplayed(type, page[selector], 10);

	return await getElementText(type, selector);
};
