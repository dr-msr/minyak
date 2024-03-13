/**
 * DataContext provides the global state management for the app data.
 * It uses React Context API to share the state and related handlers across components.
 *
 * The data state includes:
 * - latest price data
 * - settings
 * - logs
 *
 * Handlers are provided to update each part of the state and persist to localStorage.
 *
 * The DataProvider component is used to initialize the context state and wrap the app.
 */

'use client';

import React from 'react';
import generateUniqueId from 'generate-unique-id';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DataType, Log, PriceData, Setting, defaultData } from '@/data/version';
import { validateData } from './actions';
import { toast } from 'sonner';

interface DataHandler {
	data: DataType['latest'];

	initData: () => boolean;

	updatePrice: (price: PriceData) => void;
	updateSetting: (setting: Setting) => void;

	addLog: (log: Log) => void;
	delLog: (id: string) => void;

	updateRon: (ron: string) => void;
	updateUnit: (unit: string) => void;

	emptyData: () => void;
}

type DataProviderProps = {
	children: ReactNode;
};

const DataContext = createContext<DataHandler | undefined>(undefined);
export default DataContext;

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
	const [data, setData] = useState<DataType['latest']>(defaultData.latest);

	const initData = () => {
		let payload = localStorage.getItem('data');
		if (!payload) {
			const uuid = generateUniqueId({
				length: 8,
				useLetters: true,
			});

			const draftData = defaultData.latest;
			draftData.UUID = 'id-' + uuid;

			payload = JSON.stringify(draftData);
			console.log('Saved data : Empty');
			console.log(
				'Initializing default data with version : ' + draftData.Version
			);
			localStorage.setItem('data', payload);
			setData(draftData);
			return true;
		}

		try {
			const tmpData = JSON.parse(payload);
			if (validateData(tmpData)) {
				setData(tmpData);
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const updatePrice = (price: PriceData) => {
		const newPriceData = [price, ...data.PriceData].slice(0, 5);
		const newData = { ...data, PriceData: newPriceData };
		setData(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	const updateSetting = (setting: Setting) => {
		setData({ ...data, Setting: setting });
		localStorage.setItem('data', JSON.stringify(data));
	};

	const addLog = (log: Log) => {
		let dataArray = data.Log;
		dataArray.push(log);
		setData({ ...data, Log: dataArray });
		localStorage.setItem('data', JSON.stringify(data));
	};

	const delLog = (id: string) => {
		const updatedData = {
			...data,
			Log: data.Log.filter((Log: { id: string }) => Log.id !== id),
		};
		setData(updatedData);
		localStorage.setItem('data', JSON.stringify(updatedData));
	};

	const updateRon = (ron: string) => {
		setData({ ...data, Setting: { ...data.Setting, ron: ron } });
		localStorage.setItem('data', JSON.stringify(data));
	};

	const updateUnit = (unit: string) => {
		setData({ ...data, Setting: { ...data.Setting, unit: unit } });
		localStorage.setItem('data', JSON.stringify(data));
	};

	const emptyData = () => {
		try {
			localStorage.clear();
			data.Log = [];
			setData(defaultData.latest);
		} catch (error) {
			toast.error('Error clearing data');
		}
	};

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
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error('useData must be used within a DataProvider');
	}
	return context;
};
