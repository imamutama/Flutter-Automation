import verifyElementExist from './verifyElementExist';
/**
 * @param {String} table Set parameter table for the define datatable gherkin
 * @param {any} selector Set parameter selector for the element
 * @param {String} method method expect exist or not exist
 */
export default async (method: 'exist' | 'not exist', table: any) => {
	const dataTable = table.rows()[0];
	try {
		for (const row of dataTable) {
			await verifyElementExist('text', method, row);
		}
	} catch {
		throw new Error('Row for datatable null or undifined');
	}
};
