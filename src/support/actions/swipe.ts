import { swipeAtCoordinates } from '../../helpers/gestures';
import pause from './pause';

export default async (
	type: 'up' | 'down' | 'right' | 'refresh' | 'refreshMission',
) => {
	/**
	 * @type {Number} field form start cordinate and end cordinate
	 */
	let x, y, startY, endY, startX, endX;
	/**
	 * Action swipe on page
	 */
	try {
		await pause(2);
		await driver.switchContext('NATIVE_APP');
		const dimension = driver.getWindowRect();
		switch (type) {
			case 'up':
				x = (await dimension).width * 0.5;
				startY = (await dimension).height * 0.7;
				endY = (await dimension).height * 0.4;
				await swipeAtCoordinates(
					{ x: x, y: startY },
					{ x: x, y: endY },
				);
				break;
			case 'down':
				x = (await dimension).width * 0.5;
				startY = (await dimension).height * 0.2;
				endY = (await dimension).height * 0.8;
				await swipeAtCoordinates(
					{ x: x, y: startY },
					{ x: x, y: endY },
				);
				break;
			case 'right':
				y = (await dimension).height * 0.5;
				startX = (await dimension).width * 0.8;
				endX = 50;
				await swipeAtCoordinates(
					{ x: startX, y: y },
					{ x: endX, y: y },
				);
			case 'refresh':
				x = (await dimension).width * 0.5;
				startY = (await dimension).height * 0.2;
				endY = (await dimension).height * 0.6;
				await swipeAtCoordinates(
					{ x: x, y: startY },
					{ x: x, y: endY },
				);
				break;
			case 'refreshMission':
				x = (await dimension).width * 0.5;
				startY = (await dimension).height * 0.6;
				endY = (await dimension).height * 0.8;
				await swipeAtCoordinates(
					{ x: x, y: startY },
					{ x: x, y: endY },
				);
				break;
		}
	} catch (error: Error | any) {
		reportError({ message: error.message });
	}
};
