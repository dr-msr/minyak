import { d001, d002, d003, d1 } from './defaults'

export type DataType = {
	latest : v1,
	"0.0.1" : v001,
	"0.0.2" : v002,
	"0.0.3" : v003,
	"1.0.0" : v1,
	any : any,
}

export const defaultData: DataType = {
	latest: d1,
	"0.0.1": d001,
	'0.0.2': d002,
	"0.0.3" : d003,
	"1.0.0" : d1,
	any: {}
} 

export type v1 = {
	Version : string,
	UUID : string,
	UpdatedAt : Date,
	Setting : Setting,
	Log : Log[],
	PriceData : PriceData[],
	Vehicle : Vehicle[],
	Signature? : string,
}

export type v003 = {
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
	price : PriceData;
	amount : {
		unit : string;
		value : number;
	};
	consumption : number;
}

export type PriceData = {
	date : string;
	ron95 : number;
	ron97 : number;
}


export type v001 = {
	Version : string,
	Setting : {
		ron : string;
			unit : string;
			preset : {
				1 : number;
				2 : number;
				3 : number;
				4 : number;
			}},
	Log : {
		id : string;
		timestamp : Date;
		odometer : number;
		trip : number;
		ron : string;
		price : number;
		amountLitre : number;
		consumption : number;
		}[],
	PriceData :  {
		UpdatedAt : string;
		RON95 : number;
		RON97 : number;
		}[],
}

export type v002 = {
	Version : string,
	UpdatedAt : Date,
	Setting : {
		ron : string;
			unit : string;
			preset : {
				1 : number;
				2 : number;
				3 : number;
				4 : number;
			}},
	Log : {
		id : string;
		timestamp : Date;
		odometer : number;
		trip : number;
		ron : string;
		price : number;
		amountLitre : number;
		consumption : number;
	}[],
	PriceData : PriceData[],
	Vehicle : Vehicle[],
}