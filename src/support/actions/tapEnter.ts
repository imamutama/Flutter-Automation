export default async () => {
	try {
		await driver.switchContext('NATIVE_APP');
		await driver.pressKeyCode(84);
	} catch {
		throw new Error('Action enter dont press sendkeys code');
	}
};
