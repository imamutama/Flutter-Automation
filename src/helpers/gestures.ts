interface XY {
	x: number;
	y: number;
}

/**
 * Performs a swipe gesture on the screen, starting from the specified coordinates to the specified coordinates.
 * @param from - The starting coordinates of the swipe gesture.
 * @param to - The ending coordinates of the swipe gesture.
 * @returns A Promise that resolves when the swipe gesture is complete.
 */
export async function swipeAtCoordinates(from: XY, to: XY): Promise<void> {
	await browser.touchPerform([
		{ action: 'press', options: { x: from.x, y: from.y } },
		{ action: 'wait', options: { s: 10 } },
		{ action: 'moveTo', options: { x: to.x, y: to.y } },
		{ action: 'release' },
	]);
}
