export type Data = {
	timestamp : Date;
	odometer : number;
	trip : number;
	ron : string;
	price : number;
	amountRM : number;
	amountLitre : number;
	consumption : number;
}

export type Setting = {
	ron : string;
	unit : string;
	preset : {
		1 : number;
		2 : number;
		3 : number;
		4 : number;
	};
}

export type PriceData = {
	dateUpdated : string;
	RON95 : number;
	RON97 : number;
}