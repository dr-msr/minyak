
export type version = [ 
	"0.0.1"
]

export type Data = {
	Version : "0.0.1";
	Setting : Setting,
	Log : Log[],
	PriceData : PriceData[],
	Vehicle? : Vehicle ,
}

export type Vehicle = {
	id : string;
	brand : string;
	model : string;
	color : string;
	registration : string;
}


export type Setting = {
	ron : string;
		unit : string;
		preset : {
			1 : number;
			2 : number;
			3 : number;
			4 : number;
		}}

export type Log = {
	id : string;
	timestamp : Date;
	odometer : number;
	trip : number;
	ron : string;
	price : number;
	amountLitre : number;
	consumption : number;
}

export type PriceData = {
	dateUpdated : string;
	RON95 : number;
	RON97 : number;
}