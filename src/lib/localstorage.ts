import { toast } from "sonner";

export type Data = {
	timestamp : Date;
	odometer : number;
	trip : number;
	ron : string;
	price : number;
	amountRM : number;
	amountLitre : number;
}

export type Setting = {
	ron : string;
	unit : string;
	preset : {
		1 : number;
		2 : number;
		3 : number;
		4 : number;
		5 : number;
	};
}

export const defaultData = [{
	timestamp : 0 as unknown as Date,
	odometer : 0,
	ron : "RON95",
	trip : 0,
	price : 2.05,
	amountRM : 10,
	amountLitre : 5,
}]

export const defaultSetting = {
    ron : "RON95",
    unit : "RM",
    preset : {
        1 : "10",
        2 : "20",
        3 : "50",
        4 : "100",
        5 : "Other"
    },
}



export async function getSetting() {
	let settingString = localStorage.getItem('setting');
	if (!settingString) {
		settingString = JSON.stringify(defaultSetting);
		localStorage.setItem('setting', settingString);
	}
	return JSON.parse(settingString);

}

export async function updateSetting(setting : Setting) {
	localStorage.setItem('setting', JSON.stringify(setting));
}

export async function updateRon(ron : string) {
	getSetting()
	.then((setting) => {
		setting.ron = ron;
		updateSetting(setting);
	})
	.catch((err) => {
		toast.error(err);
	})
}

export async function updateUnit(unit : string) {
	getSetting()
	.then((setting) => {
		setting.unit = unit;
		updateSetting(setting);
	})
	.catch((err) => {
		toast.error(err);
	})
}

export async function updatePreset(preset : number, value : number) {
	getSetting()
	.then((setting) => {
		setting.preset[preset] = value;
		updateSetting(setting);
	})
	.catch((err) => {
		toast.error(err);
	})
}

export async function addData(data : Data) {
	let dataString = localStorage.getItem('data');
	let dataArray = dataString ? JSON.parse(dataString) : [];
	dataArray.push(data);
	localStorage.setItem('data', JSON.stringify(dataArray));
}

export async function getData() {
    try {
        let dataString = localStorage.getItem('data');
        return dataString ? JSON.parse(dataString) : [];
    } catch (error) {
        console.error('Error getting data from localStorage:', error);
        return defaultData;
    }
}
export async function deleteData(timestamp: Date) {
    let dataString = localStorage.getItem('data');
    let dataArray = dataString ? JSON.parse(dataString) : [];

    // Find the index of the data with the given timestamp
    let index = dataArray.findIndex((data: Data) => data.timestamp === timestamp);

    // If the data was found, ask for confirmation before deleting
    if (index !== -1) {
        if (window.confirm('Are you sure you want to delete this data?')) {
            dataArray.splice(index, 1);

            // Save the updated array back to local storage
            localStorage.setItem('data', JSON.stringify(dataArray));
        }
    }
}