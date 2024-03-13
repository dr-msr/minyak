/**
 * Validates input data against the latest default data version.
 * Logs a message and returns a boolean indicating whether the data is up to date.
 *
 * Exports data to a CSV file with the provided payload and formatted filename.
 * Returns an object indicating status and filename.
 *
 * Exports data to an HTML file with the provided payload and formatted filename.
 * Returns an object indicating status and filename.
 *
 * Backs up input data to a JSON file with version and date.
 * Returns an object indicating status and instructions.
 *
 * Restores data from a user-selected file, parsing it as JSON.
 * Returns a Promise resolving to the parsed data object.
 */

import { DataType, defaultData } from './version';
import exportFromJSON from 'export-from-json';

export function validateData(input: DataType['any']) {
	console.log(
		'%cDATA',
		'color: #007acc;',
		'Local : ' + input.Version,
		'Latest : ' + defaultData.latest.Version
	);

	if (input.Version == defaultData.latest.Version) {
		console.log('%cDATA', 'color: #007acc;', 'Data is up to date');
		return true;
	} else {
		console.log(
			'%cCONVERT ',
			'color: green;',
			'Initiating data conversion'
		);
		return false;
	}
}

export function exportCSV(payload: string) {
	const now = new Date();
	const today =
		now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	const file = 'Minyak-Today-Export-' + today;
	const csv = JSON.parse(payload);
	const output = csv.Log;
	exportFromJSON({ data: output, fileName: file, exportType: 'csv' });
	return {
		status: 'SUCCESS',
		message: file + '.csv generated.',
	};
}

export function exportHTML(payload: string) {
	const now = new Date();
	const today =
		now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	const file = 'Minyak-Today-Export-' + today;
	const csv = JSON.parse(payload);
	const output = csv.Log;
	exportFromJSON({ data: output, fileName: file, exportType: 'html' });
	return {
		status: 'SUCCESS',
		message: file + '.html generated.',
	};
}

export function backupData(payload: string) {
	try {
		const tmpData = JSON.parse(payload);
		if (tmpData.Log[0] == undefined) {
			return {
				status: 'FAILED',
				message:
					'Nothing to be backed up. Please add some data first.',
			};
		}
		if (tmpData.Version == undefined) {
			return {
				status: 'FAILED',
				message:
					'Unable to find data version. Corrupted data found in local storage.',
			};
		}
		const now = new Date();
		const today =
			now.getFullYear() +
			'-' +
			(now.getMonth() + 1) +
			'-' +
			now.getDate();
		const file = 'MinyakToday-Backup-' + tmpData.Version + '-' + tmpData.Log[0]?.odometer + '-' + today;
		tmpData.UpdatedAt = now;

		exportFromJSON({ data: tmpData, fileName: file, exportType: 'json' });
		return {
			status: 'SUCCESS',
			message:
				'Savefile ' +
				file +
				' generated. Please save the file in your preferred location.',
		};
	} catch (error) {
		console.log(error);
		return {
			status: 'FAILED',
			message: 'Corrupted data found in local storage. ' + error,
		};
	}
}

export function restoreFile(
	input: React.ChangeEvent<HTMLInputElement>
): Promise<any> {
	return new Promise((resolve, reject) => {
		const file = input.target.files?.[0];
		if (!file) {
			reject(new Error('No file selected'));
			return;
		}

		const reader = new FileReader();

		reader.onload = (event) => {
			const text = event.target?.result as string;

			try {
				const data = JSON.parse(text);
				resolve(data);
			} catch (error) {
				reject(new Error('Invalid JSON: ' + error));
			}
		};

		reader.onerror = (error) => {
			reject(new Error('Error reading file: ' + error));
		};

		reader.readAsText(file);
	});
}
