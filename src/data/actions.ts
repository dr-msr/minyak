import { DataType, defaultData } from './version'
import  exportFromJSON  from 'export-from-json'


export function validateData( input : DataType["any"]) {
	console.log("Saved data version : " + input.Version)
	console.log("Latest data version : " + defaultData.latest.Version)

	if (input.Version == defaultData.latest.Version) {
		return true
	} else {
		return false
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
