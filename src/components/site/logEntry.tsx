'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Separator } from "../ui/separator"
import { SetStateAction, useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Toaster, toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"
import { addData, defaultData, defaultSetting, deleteData, getData, getSetting, updateRon, updateUnit } from "@/lib/localstorage"
import { ScrollArea } from "../ui/scroll-area"



export function LogEntry() {

	const [inputOdonto, setOdonto]	= useState(0)
	const [inputAmount, setAmount]	= useState(0)
	const [inputRM, setInputRM]		= useState(0)
	const [inputLitre, setInputLitre]	= useState(0)
	const [selectedRon, setSelectedRon] = useState("")
	const [selectedPreset, selectPreset] = useState("")
	const [selectedValue, setSelectedValue] = useState("")
	const [showCustom, setShowCustom] = useState(false)
	const [priceData, setPriceData] = useState({
		dateUpdated : 0,
		RON95 : 0,
		RON97 : 0
	})
	const [settingData, setSettingData] = useState(
		{
			ron : "",
			unit : "",
			preset : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			}
		}
	)

	const [preset, setPreset] = useState({
		1 : "",
		2 : "",
		3 : "",
		4 : "",
		5 : ""
	})

	const [data, setData] = useState(defaultData)
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);
	const reversedData = [...data].reverse();
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = reversedData.slice(indexOfFirstRecord, indexOfLastRecord);
	
	const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);









	useEffect(() => {
		if (data.length > 0) {
			setOdonto(data[data.length - 1].odometer)
		}
	},[data])

	function initAdd() {
		if (inputOdonto == 0) {
			toast("Odometer cannot be empty.")
			return
		}
		if (selectedValue == "") {
			toast("Please select an amount.")
			return
		}

		if (data[data.length - 1] != undefined) {
			if (inputOdonto <= data[data.length - 1].odometer ) {
				toast("Odometer reading cannot be same or lower than previous record.")
			return
		}}

		var trip = 0
		if (data.length > 0) {
			trip = inputOdonto - data[data.length - 1].odometer
		}
			

	


		const hariIni = new Date()
		const draftData = {
			timestamp : hariIni,
			odometer : inputOdonto,
			trip : trip,
			ron : selectedRon,
			price : priceData[selectedRon as keyof typeof priceData],
			amountRM : inputRM,
			amountLitre : inputLitre,
		}
		setData([...data, draftData])
		addData(draftData)
		toast("Fueling record has been created.")
		setSelectedValue("")
	}

	async function fetchPrice(tsoast : string) {
		const response = await fetch("https://api.data.gov.my/data-catalogue/?id=fuelprice&sort=-date&limit=1")
		const data = await response.json()
		setPriceData({
			dateUpdated : data[0].date,
			RON95 : data[0].ron95,
			RON97 : data[0].ron97
		})
		if (tsoast != "none") {
		toast.success("Fuel price has been updated. Latest data fetched : " + data[0].date + " (https://data.gov.my)" )
		}
	}


	
	function togglePreset(e : string) {
		if (e == "RM") {
			setPreset(
				{
					1 : "RM " + settingData.preset[1],
					2 : "RM " + settingData.preset[2],
					3 : "RM " + settingData.preset[3],
					4 : "RM " + settingData.preset[4],
					5 : "Other"
				}
			)
			selectPreset("RM")
		} else if (e == "L") {
			setPreset(
				{
					1 : settingData.preset[1] + " L",
					2 : settingData.preset[2] + " L",
					3 : settingData.preset[3] + " L",
					4 : settingData.preset[4] + " L",
					5 : "Other"
				}
			)
						selectPreset("L")
		}
	}

	function loadSetting() {
		getSetting()
		.then((data) => {
			setSettingData(data)
			setSelectedRon(data.ron)
			togglePreset(data.unit)
			if (data.unit == "RM") {
				setPreset(
					{
						1 : "RM " + data.preset[1],
						2 : "RM " + data.preset[2],
						3 : "RM " + data.preset[3],
						4 : "RM " + data.preset[4],
						5 : "Other"
					}
				)} else if (data.unit == "L") {
			setPreset(
				{
					1 : data.preset[1] + " L",
					2 : data.preset[2] + " L",
					3 : data.preset[3] + " L",
					4 : data.preset[4] + " L",
					5 : "Other"
				}
			)}
		})
		.catch((err) => {
			console.error(err)
		})
	}

	function loadData() {
		getData()
		.then((data) => {
			setData(data)
		})
	}

	useEffect(() => {
		loadSetting();
		loadData();
		fetchPrice("none");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(() => {
		switch (selectedValue) {
		case "1":
			setAmount(10)
			setShowCustom(false)
			break
		case "2":
			setAmount(20)
			setShowCustom(false)
			break
		case "3":
			setAmount(50)
			setShowCustom(false)
			break
		case "4":
			setAmount(100)
			setShowCustom(false)
			break
		case "5":
			setShowCustom(true)
			break
	}},[selectedValue])

	useEffect(() => {
		if (selectedPreset == "RM") {
			setInputRM(inputAmount)
			if (selectedRon == "RON95") {
				setInputLitre(parseFloat((inputAmount / priceData.RON95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputLitre(parseFloat((inputAmount / priceData.RON97).toFixed(2)))
			}
			
		} else if (selectedPreset == "L") {
			setInputLitre(inputAmount)
			if (selectedRon == "RON95") {
				setInputRM(parseFloat((inputAmount * priceData.RON95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputRM(parseFloat((inputAmount * priceData.RON97).toFixed(2)))
			}
		}

	},[inputAmount, selectedPreset, selectedRon, priceData])

	function getAverageFuelConsumption() {
		if (data.length > 1) {
			const totalKm = data[data.length - 1].odometer - data[0].odometer
			const totalLitre = data.slice(1).map((data) => data.amountLitre).reduce((a, b) => a + b, 0);
			return (totalKm / totalLitre).toFixed(2)
		
		} else {
			return "0.00"
		}
	
	
	}

	
return (
    <Tabs defaultValue="log" className="w-[400px]">

    	<TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="log">Log Entry</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    	</TabsList>

    	<TabsContent value="log">
    		<Card>
        		<CardHeader>
        			<CardTitle>Isi Minyak</CardTitle>
        		</CardHeader>
          	<CardContent className="space-y-2">
      
			<div className="space-y-1 text-center">
				<Label htmlFor="name">Odometer</Label>
				<Input style={{textAlign:"center", fontSize:28, padding:5}} autoFocus type="number" id="odometer" value={inputOdonto} onChange={(e) => setOdonto(Number(e.target.value))} />
			</div>


			<div className="flex justify-between">
				<div>
				<ToggleGroup type="single" size="sm" value={selectedRon} onValueChange={(e) => {
					setSelectedRon(e)
					updateRon(e)}}>
					<ToggleGroupItem value="RON95">RON95</ToggleGroupItem>
					<ToggleGroupItem value="RON97">RON97</ToggleGroupItem>
				</ToggleGroup>
				</div>
				<div>
				<ToggleGroup type="single" size="sm" value={selectedPreset} onValueChange={(e) => {
					togglePreset(e)
					updateUnit(e)}}>
					<ToggleGroupItem value="RM">RM</ToggleGroupItem>
					<ToggleGroupItem value="L">Litre</ToggleGroupItem>
				</ToggleGroup>
				</div>
			</div>

			<Separator className="my-4" />

			<div>
				<ToggleGroup type="single" size="sm" aria-required="true" className="flex justify-between" value={selectedValue} onValueChange={ (e) => setSelectedValue(e)}>
					<ToggleGroupItem value="1">{preset[1]}</ToggleGroupItem>
					<ToggleGroupItem value="2">{preset[2]}</ToggleGroupItem>
					<ToggleGroupItem value="3">{preset[3]}</ToggleGroupItem>
					<ToggleGroupItem value="4">{preset[4]}</ToggleGroupItem>
					<ToggleGroupItem value="5">{preset[5]}</ToggleGroupItem>
				</ToggleGroup>
			</div>

			{ showCustom && <div className="space-y-1 flex items-center">
            	{ (selectedPreset == "RM") && <div className="p-2">RM</div> }
				<Input type="number" size={10} id="custom" placeholder={(selectedPreset === "L") ? "L" : "RM"} onChange={(e) => setAmount(Number(e.target.value))} />
				{ (selectedPreset == "L") && <div className="p-2">Litre</div> }
            </div> }




          </CardContent>
          <CardFooter>
				<div className="flex flex-col w-full gap-2 mt-2">

					<div className="flex flex-row">
						<div className="flex-grow flex-row">
							<Badge className="rounded-r-none px-1" style={{backgroundColor:"yellow", color:"black",borderColor:"black"}}>RON95</Badge><Badge variant={"outline"} className="rounded-none" style={{borderColor:"black"}}>{ priceData.RON95 != 0 ? "RM " + priceData.RON95 + "/L" : "Loading.." }</Badge>
							<Badge className="rounded-none px-1" style={{backgroundColor:"lightgreen", color:"black",borderColor:"black"}}>RON97</Badge><Badge variant={"outline"} className="rounded-l-none" style={{borderColor:"black"}}>{ priceData.RON97 != 0 ? "RM " + priceData.RON97 + "/L" : "Loading.." }</Badge>
						</div>
						<div className=""><Badge onClick={() => fetchPrice("")}>Update</Badge></div>	
					</div>	

            		<Button onClick={() => initAdd()} style={{textAlign:"center"}}>Log Entry</Button>

				</div>
    	    </CardFooter>
        </Card>
    </TabsContent>

      <TabsContent value="dashboard">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Data is everything.
            </CardDescription>
          </CardHeader>
		  

          <CardContent className="space-y-2">

		  <div className="flex flex-row justify-around items-center space-x-4 rounded-md border p-4">
						<div className="flex flex-col">
						<h1 className="text-center text-5xl">{getAverageFuelConsumption()}</h1>

							<h1 className="text-center">km/litre</h1>
</div>
				    	</div> 
			

		  <Table className="w-[700px]">
      		<TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Odometer</TableHead>
          <TableHead className="w-[150px] text-center">RON & Price</TableHead>
		  <TableHead className="w-[180px] text-right">Amount & Cost </TableHead>
		  <TableHead className="w-[180px] text-right">Consumption (Trip) </TableHead>
        </TableRow>
      </TableHeader>
<TableBody>
{currentRecords.map((data, index) => (
        <TableRow key={index} onClick={(e) => {
			deleteData(data.timestamp)
			loadData();
			}}>
            <TableCell className="flex flex-col justify-center items-center text-left"><div className=""><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleDateString("en-MY")}</Badge><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Badge></div></TableCell>
            <TableCell className="items-center text-center"><Badge>{data.odometer}</Badge></TableCell>
            <TableCell className="items-center text-center">{<div><Badge style={data.ron === "RON95" ? {backgroundColor:'yellow', color:'black', borderColor:'black'} : {backgroundColor:'lightgreen', color:'black', borderColor:'black'}}>{data.ron}</Badge><Badge variant="outline" style={{border:'none'}}>RM {data.price}</Badge></div>}</TableCell>
            <TableCell className="text-right">{<div><Badge variant="outline">{data.amountLitre.toFixed(2)} L : RM {data.amountRM}</Badge></div>}</TableCell>
            <TableCell className="text-right">{<div><Badge variant="destructive">{( (data.trip != 0) ? (data.trip / data.amountLitre).toFixed(2) + " km/L" : "0 km/L")}</Badge></div>}<Badge variant="outline">{( (data.trip != 0) ? (data.trip + " km") : "0 km")}</Badge></TableCell>
        </TableRow>
))}
</TableBody>
    </Table>
	<div className="flex flex-row-reverse gap-2">
    {Array.from({length: Math.ceil(data.length / recordsPerPage)}, (_, i) => Math.ceil(data.length / recordsPerPage) - i)
        .map(pageNumber => (
            <Button key={pageNumber} size="icon" onClick={() => paginate(pageNumber)}>{pageNumber}</Button>
        ))
    }
</div>
			
		   


          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </TabsContent>
	  <Toaster richColors  />

    </Tabs>

	
  )
}
