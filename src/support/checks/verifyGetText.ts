import getTextField from '../actions/getTextField';
import verifyElementExist from './verifyElementExist';

/**
 * @param {any} selector Define selector element
 */
export default async (
	type: 'native' | 'flutter',
	selector: any,
	method: 'exist' | 'not exist',
) => {
	/**
	 * @object text for the define selector text value
	 */
	const text = await getTextField(type, selector);

	await verifyElementExist('text', method, selector);
};
