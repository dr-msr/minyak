import { v001, v002 } from "./version";

export const d001 : v001  = {
	Version : "0.0.1",
	Setting : {
		ron : "RON95",
		unit : "RM",
		preset : {
			1 : 10,
			2 : 30,
			3 : 50,
			4 : 100,
		}},
	Log : [],
	PriceData : [{
		dateUpdated : "2024-01-01",
		RON95 : 2.05,
		RON97 : 3.47,
	}]
}

export const d002 : v002 = {
	Version : "0.0.2",
	UpdatedAt : new Date(),
	Setting : {
		ron : "RON95",
		unit : "RM",
		preset : {
			1 : 10,
			2 : 30,
			3 : 50,
			4 : 100,
		}},
	Log : [],
	PriceData : [{
		dateUpdated : "2024-01-01",
		RON95 : 2.05,
		RON97 : 3.47,
	}],
	Vehicle : []
}
