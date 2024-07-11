const find = require('appium-flutter-finder');

/**
 * Wait for the given element to become visible
 * @param  {any}   selector      Element selector
 * @param {String} type  Type element
 *
 * @todo  merge with waitfor
 */
export default async (
	type: 'native' | 'flutter' | 'text',
	selector: any,
	timeout: number,
) => {
	await driver.switchContext(type === 'flutter' ? 'FLUTTER' : 'NATIVE_APP');
	const element = getElement(type, selector);
	const ms = timeout * 1000;

	if (type === 'flutter') {
		await waitForFlutterDisplayed(element, ms);
	} else {
		await waitForDisplayed(element, timeout);
	}
};

function getElement(type: 'native' | 'flutter' | 'text', selector: any) {
	const elementText = "//*[contains(@content-desc,'" + selector + "')]";
	return type === 'native'
		? selector
		: type === 'flutter'
		? find.byValueKey(selector)
		: elementText;
}

async function waitForFlutterDisplayed(element: any, ms: number) {
	try {
		await driver.execute('flutter:waitForTappable', element, ms);
		return true;
	} catch (error) {
		throw new Error('Element not found: ' + element);
	}
}

async function waitForDisplayed(element: any, timeout: number) {
	await driver.waitUntil(
		async function () {
			return await $(element).isDisplayed();
		},
		{
			timeout: timeout * 1000,
			timeoutMsg: 'Element not found: ' + element,
		},
	);
}
