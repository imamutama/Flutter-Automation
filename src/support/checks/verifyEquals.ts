import assert from 'assert';
import getTextField from '../actions/getTextField';

/**
 * @param {any} selector - The selector element.
 * @param {any} valueExpected - The expected value.
 * */
export default async (
	type: 'native' | 'flutter',
	selector: string,
	expectedValue: string,
) => {
	await driver.switchContext(type === 'native' ? 'NATIVE_APP' : 'FLUTTER');
	const actualValue = await getTextField(type, selector);

	if (actualValue !== expectedValue) {
		throw new Error(
			`Expected value ${expectedValue}, but got ${actualValue}`,
		);
	}
};
