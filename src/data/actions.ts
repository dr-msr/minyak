import { toast } from 'sonner'
import { DataType, defaultData } from './version'
import { convertData } from './conversion'
import { useData } from './context'

export function validateData( input : DataType) {
	console.log("Saved data version : " + input.Version)
	console.log("Latest data version : " + defaultData.latest.Version)

	if (input.Version == defaultData.latest.Version) {
		console.log("true")
		return true
	} else {
		return false
	}
}