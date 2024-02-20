// import { toast } from "sonner";
// import { defaultData, defaultSetting } from "./defaults";
// import { Data, Setting } from "./types";

export async function getPrice() {
	try {
	  const response = await fetch("https://api.data.gov.my/data-catalogue/?id=fuelprice&sort=-date&limit=1");
	  const data = await response.json();
	  return data[0];
	} catch (error) {
	  console.error(error);
	  return null;
	}
  }

// export async function getSetting() {
// 	let settingString = localStorage.getItem('setting');
// 	if (!settingString) {
// 		settingString = JSON.stringify(defaultSetting);
// 		localStorage.setItem('setting', settingString);
// 	}
// 	return JSON.parse(settingString);
// }

// export async function updateSetting(setting : Setting) {
// 	localStorage.setItem('setting', JSON.stringify(setting));
// }

// export async function updateRon(ron : string) {
// 	getSetting()
// 	.then((setting) => {
// 		setting.ron = ron;
// 		updateSetting(setting);
// 	})
// 	.catch((err) => {
// 		toast.error(err);
// 	})
// }

// export async function updateUnit(unit : string) {
// 	getSetting()
// 	.then((setting) => {
// 		setting.unit = unit;
// 		updateSetting(setting);
// 	})
// 	.catch((err) => {
// 		toast.error(err);
// 	})
// }

// export async function updatePreset(preset : number, value : number) {
// 	getSetting()
// 	.then((setting) => {
// 		setting.preset[preset] = value;
// 		updateSetting(setting);
// 	})
// 	.catch((err) => {
// 		toast.error(err);
// 	})
// }

// export async function addData(data : Data) {
// 	let dataString = localStorage.getItem('data');
// 	let dataArray = dataString ? JSON.parse(dataString) : [];
// 	dataArray.push(data);
// 	localStorage.setItem('data', JSON.stringify(dataArray));
// }

// export async function getData() {
//     try {
//         let dataString = localStorage.getItem('data');
//         return dataString ? JSON.parse(dataString) : [];
//     } catch (error) {
//         console.error('Error getting data from localStorage:', error);
//         return defaultData;
//     }
// }
// export async function deleteData(timestamp: Date) {
//     let dataString = localStorage.getItem('data');
//     let dataArray = dataString ? JSON.parse(dataString) : [];
//     let index = dataArray.findIndex((data: Data) => data.timestamp === timestamp);

//     if (index !== -1) {
//         if (window.confirm('Are you sure you want to delete this data?')) {
//             dataArray.splice(index, 1);
//             localStorage.setItem('data', JSON.stringify(dataArray));
//         }
//     }
// }