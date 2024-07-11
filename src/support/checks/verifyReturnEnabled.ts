import data from '../../helpers/data';
import { pages } from '../../pages/pages';
import pause from '../actions/pause';

/**
 * Perform an click action on the given element
 * @param  {String}   type    Type of the element (text or selector)
 * @param  {String}   selector Element selector
 */

export default async (type: 'native' | 'text', selector: any) => {
	const { currentPage } = data;
	const page = pages[currentPage];

	await driver.switchContext('NATIVE_APP');

	const element =
		type === 'native'
			? await $(page[selector])
			: await $("//*[contains(@content-desc,'" + selector + "')]");

	await pause(3);

	return await element.isDisplayed();
};
