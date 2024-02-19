'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getData, getPrice, getSetting } from "@/lib/localstorage"
import DashboardEntry from "./dashboardEntry"
import LogEntry from "./logEntry"
import { defaultData, defaultPrice, defaultSetting } from "@/lib/defaults"
import { Data, PriceData, Setting } from "@/lib/types"

export default function MainEntry() {

	const [priceData, setPriceData] = useState<PriceData>(defaultPrice)
	const [settingData, setSettingData] = useState<Setting>(defaultSetting)
	const [data, setData] = useState<Data[]>(defaultData)
	const insertData = (input : Data) => {
		setData([...data, input])
	}
	
	function loadSetting() {
		getSetting()
		.then((data) => { setSettingData(data) })
		.catch((err) => { console.error(err) })
	}

	function loadData() {
		getData()
		.then((data) => { setData(data)})
	}

	function loadPrice() {
		getPrice()
		.then((data) => {
			if (data == null)
			{
				setPriceData(defaultPrice)
				toast.error("Failed to fetch fuel price data. Using default data.")
			} else {
				setPriceData({
					dateUpdated : data.date,
					RON95 : data.ron95,
					RON97 : data.ron97,
				})
				toast.success("Fuel price has been updated. Latest data fetched : " + data.date + " (https://data.gov.my)" )
			}
		})
	}

	useEffect(() => {
		loadSetting();
		loadData();
		loadPrice();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

return (
    <Tabs defaultValue="log" className="w-[400px]">

    	<TabsList className="grid w-full grid-cols-2">
        	<TabsTrigger value="log">Log Entry</TabsTrigger>
        	<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    	</TabsList>

    	<TabsContent value="log">
			<LogEntry 
				data={data} 
				settingData={settingData} 
				priceData={priceData} 
				updateData={insertData} 
				fetchPrice={loadPrice} 
			/>
		</TabsContent>

    	<TabsContent value="dashboard">
			<DashboardEntry 
				data={data} 
				loadData={loadData} 
			/>
      	</TabsContent>

    </Tabs>
)}
