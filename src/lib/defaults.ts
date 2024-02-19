export const defaultPrice = {
	dateUpdated : "19 Feb 2024 (Offline)",
	RON95 : 2.05,
	RON97 : 3.47,
}

export const defaultData = [{
	timestamp : 0 as unknown as Date,
	odometer : 0,
	ron : "RON95",
	trip : 0,
	price : 2.05,
	amountRM : 10,
	amountLitre : 5,
	consumption : 0,
}]

export const defaultSetting = {
    ron : "RON95",
    unit : "RM",
    preset : {
        1 : 10,
        2 : 20,
        3 : 50,
        4 : 100,
    },
}
