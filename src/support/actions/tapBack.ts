export default async () => {
	try {
		await driver.switchContext('NATIVE_APP');
		await driver.pressKeyCode(4);
	} catch {
		throw new Error('Action back dont press sendkeys code');
	}
};
