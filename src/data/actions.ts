import { DataType, defaultData } from './version'
import  exportFromJSON  from 'export-from-json'


export function validateData( input : DataType["any"]) {
	console.log("%cDATA", "color: #007acc;", "Local : " + input.Version,"Latest : " + defaultData.latest.Version)

	if (input.Version == defaultData.latest.Version) {
		console.log("%cDATA", "color: #007acc;","Data is up to date")
		return true
	} else {
		console.log("%cCONVERT ", "color: green;", "Initiating data conversion")
		return false
	}
}

export function exportCSV( payload : string) {
	const now = new Date();
	const today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
	const file = 'Minyak-Today-Export-' + today ;
	const csv = JSON.parse(payload)
	const output = csv.Log
	exportFromJSON({ data: output, fileName: file, exportType: 'csv' })
	return {
		status : "SUCCESS",
		message : file + ".csv generated.",
	}
}

export function exportHTML( payload : string) {
	const now = new Date();
	const today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
	const file = 'Minyak-Today-Export-' + today ;
	const csv = JSON.parse(payload)
	const output = csv.Log
	exportFromJSON({ data: output, fileName: file, exportType: 'html' })
	return {
		status : "SUCCESS",
		message : file + ".html generated.",
	}
}



export function backupData( payload : string) {

	try {
		const tmpData = JSON.parse(payload)	

		if (tmpData.Version == undefined) {
			return {
				status : "FAILED",
				message : "Unable to find data version. Corrupted data found in local storage.",
			}
		}
		const now = new Date();
		const today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
		const file = 'Minyak-Today-Backup-' + tmpData.Version + '-' + today ;
		tmpData.UpdatedAt = now

		// let output = fs.readFileSync(file);

		
		exportFromJSON({ data: tmpData, fileName: file, exportType: 'json' })
		return {
			status : "SUCCESS",
			message : "Savefile " + file + " generated. Please save the file in your preferred location.",
		}
		

	} catch (error) {
		console.log(error)
		return {
			status : "FAILED",
			message : "Corrupted data found in local storage. " + error,
		}
	}

}
export function restoreFile(input: React.ChangeEvent<HTMLInputElement>): Promise<any> {
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
