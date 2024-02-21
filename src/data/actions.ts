import { DataType, defaultData } from './version'


export function validateData( input : DataType["any"]) {
	console.log("Saved data version : " + input.Version)
	console.log("Latest data version : " + defaultData.latest.Version)

	if (input.Version == defaultData.latest.Version) {
		console.log("true")
		return true
	} else {
		return false
	}
}