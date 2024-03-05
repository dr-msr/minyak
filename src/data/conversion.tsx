import generateUniqueId from "generate-unique-id";
import { DataType, Log, defaultData, v002, v003 } from "./version";

export function convertData (input : DataType["any"]) {

	if (input.Version == defaultData.latest.Version) {
		console.log("%cCONVERT ", "color: green;", "Reached the latest version. Exiting conversion..")
		console.log(input)
		return input as DataType["latest"]
	}

	try {
		switch (input.Version) {

			/* 	Changelog 0.01 > 0.02
				1. Added UpdatedAt
				2. Added Vehicle[]
			*/
			case "0.0.1" : {

				

				console.log("%cCONVERT ", "color: green;", "Init convert 0.0.1 > 0.0.2")
				const draftData : DataType["0.0.2"] = {
					Version : "0.0.2",
					UpdatedAt : new Date(),
					Setting : input.Setting,
					Log : input.Log,
					PriceData : input.PriceData,
					Vehicle : []
				}
				console.log("%cCONVERT ", "color: green;", ">> Converted to 0.02")
				return convertData(draftData)
			}

			/* 	Changelog 0.02 > 0.03
				1. Update Log[].price to :
					price : {
						date : string;
						ron95 : number;
						ron97 : number;
					};
				2. Change Log[].amountLitre to : 
					amount : {
						unit : string;
						value : number;
					};
			*/
			case "0.0.2" : {

				

				console.log("%cCONVERT ", "color: green;", "Init convert 0.0.2 > 0.0.3")
	
				const inputData : v002 = input
	
				let draftLog : { 
					id : string;
					timestamp : Date;
					odometer : number;
					trip : number;
					ron : string;
					price : {
						date : string;
						ron95 : number;
						ron97 : number;
					};
					amount : {
						unit : string;
						value : number;
					};
					consumption : number;
				}[] = []


	
				inputData.Log.forEach((log) => {

	
					var draftRon95 : number = 0
					var draftRon97 : number = 0
	
					if (log.ron == "RON95") {
						draftRon95 = log.price
					} else {
						draftRon97 = log.price
					}

					const date = new Date(log.timestamp); // Convert timestamp to Date object

	
					const draftLogEntry : Log = {
						id : log.id,
						timestamp : log.timestamp,
						odometer : log.odometer,
						trip : log.trip,
						ron : log.ron,
						price : {
							date : date.toLocaleDateString("en-MY"),
							ron95 : draftRon95,
							ron97 : draftRon97
						},
						amount : {
							unit : "L",
							value : log.amountLitre
						},
						consumption : log.consumption
					}
					draftLog.push(draftLogEntry)
				})


	
				const draftData : DataType["0.0.3"] = {
					Version : "0.0.3",
					UpdatedAt : new Date(),
					Setting : input.Setting,
					Log : draftLog,
					PriceData : input.PriceData,
					Vehicle : []
				}
				console.log("%cCONVERT ", "color: green;", ">> Converted to 0.03")
				return convertData(draftData)
			}

			/* 	Changelog 0.03 > 1.0.0
				1. Added UUID
				2. Added Signature
			*/
			case "0.0.3" : {



				console.log("%cCONVERT ", "color: green;", "Init convert 0.0.2 > 0.0.3")
				const inputData : v003 = input

				const uuid = generateUniqueId({
					length: 8,
					useLetters: true
				  });

				const draftData : DataType["latest"] = {
					Version : "1.0.0",
					UUID : "id-" + uuid,
					UpdatedAt : new Date(),
					Setting : inputData.Setting,
					Log : inputData.Log,
					PriceData : inputData.PriceData,
					Vehicle : [],
					Signature : defaultData["1.0.0"].Signature
				}

				console.log("%cCONVERT ", "color: green;", ">> Converted to 1.0.0")
				return convertData(draftData)
			}


			default : {
				return null
			}
		}

	} catch (error) {
		return null
	}

}