import assert from 'assert';
import getTextField from '../actions/getTextField';

/**
 * @param {any} selector Define selector element
 * @param {any} valueExpected Define valueExpected
 */
export default async (
	type: 'native' | 'flutter',
	selector: any,
	shouldBeNull: 'null' | 'not null',
) => {
	const text = await getTextField(type, selector);
	console.log('value text :' + text);

	if (shouldBeNull === 'null') {
		assert.equal(text, null);
	} else {
		assert.notEqual(text, null);
	}
};
