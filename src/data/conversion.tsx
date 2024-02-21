import { DataType } from "./version";

export function convertData (input : DataType) {
	if (input.Version === "0.0.1") {
		const draftData : DataType["latest"] = {
			Version : "0.0.2",
			UpdatedAt : new Date(),
			Setting : input.Setting,
			Log : input.Log,
			PriceData : input.PriceData,
			Vehicle : []
		}
		return draftData
	} else {
		return null
	}
}