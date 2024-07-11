import setInputField from './setInputField';

/**
 * Set input fields for each row in the given data table.
 *
 * @param {any} table - The data table containing the input values.
 * @param {'native' | 'flutter'} type - The type of the element selector.
 * @param {any} selector - The selector for the element.
 * @throws {Error} If the datatable is null or undefined or the element selector cannot be found.
 */
export default async (
	type: 'native' | 'flutter',
	selector: any,
	table: any,
) => {
	const dataTable = table.rows()[0];
	for (const row of dataTable) {
		console.log('data row : ' + row);
		await setInputField(type, row, selector).catch(() => {
			throw new Error(
				`Row for datatable null or undifined ${dataTable[0]} and selector ${selector} cannot find `,
			);
		});
	}
};
