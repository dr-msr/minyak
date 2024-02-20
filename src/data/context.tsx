'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { Data, Log, PriceData, Setting } from "@/data/version";
import { defaultDataV001 } from "@/lib/defaults";
import React from "react";
import ShortUniqueId from "short-unique-id";

interface DataHandler  {

	data : Data;

	initData : () => void;

	updatePrice: (price: PriceData) => void;
	updateSetting: (setting: Setting ) => void;

	addLog: (log: Log) => void;
	delLog: (id: string) => void;

	updateRon: (ron: string) => void;
	updateUnit: (unit: string) => void;

	emptyData: () => void;

}

const DataContext = createContext<DataHandler | undefined>(undefined);

export default DataContext;




type DataProviderProps = {
	children: ReactNode;
  };


export const DataProvider : React.FC<DataProviderProps> = ({ children }) => {

	const [data, setData] = useState<Data>(defaultDataV001);

	const initData = () => {
		let payload = localStorage.getItem('data');
		if (!payload) {
			payload = JSON.stringify(defaultDataV001);
			localStorage.setItem('data', payload);
		}
		setData(JSON.parse(payload));
	}

	const updatePrice = (price: PriceData) => {
		setData({...data, PriceData : [price, ...data.PriceData]});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const updateSetting = (setting: Setting) => {
		setData({...data, Setting : setting});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const addLog = (log: Log) => {
		let dataArray = data.Log;
		dataArray.push(log);
		setData({...data, Log : dataArray});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const delLog = (id: string) => {
		setData({...data, Log : data.Log.filter((log) => log.id !== id)});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const updateRon = (ron: string) => {
		setData({...data, Setting : {...data.Setting, ron: ron}});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const updateUnit = (unit: string) => {
		setData({...data, Setting : {...data.Setting, unit: unit}});
		localStorage.setItem('data', JSON.stringify(data));
	}

	const emptyData = () => {
		localStorage.removeItem('data');
		initData();
	}

	const value = {
		data,
		initData,
		updatePrice,
		updateSetting,
		addLog,
		delLog,
		updateRon,
		updateUnit,
		emptyData,
	}

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	);
}
	
export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
	  throw new Error('useData must be used within a DataProvider');
	}
	return context;
  };