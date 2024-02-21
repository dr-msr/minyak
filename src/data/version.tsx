import { d001, d002 } from './defaults'

export type DataType = {
	latest : v002,
	"0.0.1" : v001,
	"0.0.2" : v002,
} | any

export const defaultData: DataType = {
	latest: d002,
	"0.0.1": d001,
	'0.0.2': d002,
} 


export type v001 = {
	Version : string,
	Setting : Setting,
	Log : Log[],
	PriceData : PriceData[],
}

export type v002 = {
	Version : string,
	UpdatedAt : Date,
	Setting : Setting,
	Log : Log[],
	PriceData : PriceData[],
	Vehicle : Vehicle[],
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


