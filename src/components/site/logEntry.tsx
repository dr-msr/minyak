import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useData } from "@/data/context"
import { getPrice } from "@/lib/utils"
import generateUniqueId from 'generate-unique-id'
import { Log } from "@/data/version"




export const LogEntry = () => {

	const context = useData();
	const data = context.data.Log
	const settingData = context.data.Setting
	const priceData = context.data.PriceData[0]

	const [inputOdonto, setOdonto]	= useState(0)
	const [selectedRon, setSelectedRon] = useState("")
	const [selectedPreset, selectPreset] = useState("")
	const [selectedValue, setSelectedValue] = useState("")
	const [preset, setPreset] = useState(
		{
			1 : "RM " + settingData.preset[1],
			2 : "RM " + settingData.preset[2],
			3 : "RM " + settingData.preset[3],
			4 : "RM " + settingData.preset[4],
			5 : "Other"
		}
	)
	const [showCustom, setShowCustom] = useState(false)
	const [inputAmount, setAmount]	= useState(0)
	const [inputRM, setInputRM]		= useState(0)
	const [inputLitre, setInputLitre]	= useState(0)

	function togglePreset(e : string) {
		if (e == "RM") {
			setPreset({
				1 : "RM " + settingData.preset[1],
				2 : "RM " + settingData.preset[2],
				3 : "RM " + settingData.preset[3],
				4 : "RM " + settingData.preset[4],
				5 : "Other"
			})
			selectPreset("RM")
		} else if (e == "L") {
			setPreset({
				1 : settingData.preset[1] + " L",
				2 : settingData.preset[2] + " L",
				3 : settingData.preset[3] + " L",
				4 : settingData.preset[4] + " L",
				5 : "Other"
			})
			selectPreset("L")
	}}

	function getLastFuel(amount: {unit: string, value: number}, ron: string) {
		if (amount.unit === "RM") {
			if (ron == "RON95") {
				return amount.value / priceData.ron95
			} else {
				return amount.value / priceData.ron97
			}
		} else {
			if (ron == "RON95") {
				return amount.value * priceData.ron95
			} else {
				return amount.value * priceData.ron97
			}
		}
	}

	function initAdd() {
		if (inputOdonto <= 0) { toast("Odometer cannot be empty or negative."); return }
		if (selectedValue == "") { toast("Please select an amount."); return }
		if (inputAmount <= 0) { toast("Amount cannot be empty or negative."); return }

		if (data[data.length - 1] != undefined) {
			if (inputOdonto <= data[data.length - 1].odometer ) {
				toast("Odometer reading cannot be same or lower than previous record.")
			return
		}}

		var trip = (data.length > 0) ? inputOdonto - data[data.length - 1].odometer : 0
		var consumption = (data.length > 0) ? trip / getLastFuel(data[data.length -1].amount, data[data.length -1].ron ) : 0

		const hariIni = new Date()
		const id2 = generateUniqueId({
			length: 8,
			useLetters: true
		  });

		const draftData : Log = {

			id : id2,
			timestamp : hariIni,
			odometer : inputOdonto,
			trip : trip,
			ron : selectedRon,
			price : priceData,
			amount : {
				unit : selectedPreset,
				value : inputAmount
			},
			consumption : consumption
		}

		context.addLog(draftData)
		const result = (context.data.Log.length > 1) ? 
			"Fueling record has been created. You has completed " + trip + "km journey with " + consumption.toFixed(2) + " km/L fuel consumption." : 
			"Fueling record has been created."
		toast.success(result)
		setSelectedValue("")
	}

	async function initPrice() {
		const harga = await getPrice()
		if (harga) {
			context.updatePrice(harga)
			toast.success("Price updated successfully : " + new Date(harga.date).toLocaleDateString("en-MY") + " (https://data.gov.my).")
		} else {
			toast.error("Failed to fetch the latest price. Current price is dated at " + new Date(priceData.date).toLocaleDateString("en-MY") + ".")
	}}

	useEffect(() => {
		switch (selectedValue) {
		case "1":
			setAmount(settingData.preset[1]); setShowCustom(false); break;
		case "2":
			setAmount(settingData.preset[2]); setShowCustom(false); break;
		case "3":
			setAmount(settingData.preset[3]); setShowCustom(false); break;
		case "4":
			setAmount(settingData.preset[4]); setShowCustom(false); break;
		case "5":
			setShowCustom(true); break;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}},[selectedValue])

	useEffect(() => {
		if (data.length > 0) {
			setOdonto(data[data.length - 1].odometer)
		} else {
			setOdonto(0)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[data])

	useEffect(() => {
		if (context.data.PriceData.length == 1) { initPrice()}

		if (data.length > 0) {
			setOdonto(data[data.length - 1].odometer)
		} else {
			setOdonto(0)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(() => {
		if (selectedPreset == "RM") {
			setInputRM(inputAmount)
			if (selectedRon == "RON95") {
				setInputLitre(parseFloat((inputAmount / priceData.ron95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputLitre(parseFloat((inputAmount / priceData.ron97).toFixed(2)))
			}
		} else if (selectedPreset == "L") {
			setInputLitre(inputAmount)
			if (selectedRon == "RON95") {
				setInputRM(parseFloat((inputAmount * priceData.ron95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputRM(parseFloat((inputAmount * priceData.ron97).toFixed(2)))
	}}},[inputAmount, selectedPreset, selectedRon, priceData])


	useEffect(() => {
		setSelectedRon(settingData.ron)
		togglePreset(settingData.unit)
		if (settingData.unit == "RM") {
			setPreset(
				{
					1 : "RM " + settingData.preset[1],
					2 : "RM " + settingData.preset[2],
					3 : "RM " + settingData.preset[3],
					4 : "RM " + settingData.preset[4],
					5 : "Other"
				}
			)} else if (settingData.unit == "L") {
			setPreset(
				{
					1 : settingData.preset[1] + " L",
					2 : settingData.preset[2] + " L",
					3 : settingData.preset[3] + " L",
					4 : settingData.preset[4] + " L",
					5 : "Other"
		})}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[settingData])



return (
	<Card>
		<CardHeader>
			<CardTitle className="text-center">Odometer</CardTitle>
		</CardHeader>
	  
 	<CardContent className="space-y-2">

		<div className="space-y-2 text-center">
			<Input 
				style={{textAlign:"center", fontSize:28, padding:5, marginBottom:20}} 
				autoFocus 
				type="number" 
				id="odometer" 
				value={inputOdonto} 
				onChange={(e) => setOdonto(Number(e.target.value))} />
		</div>

		<div className="flex justify-between">
			<div>
				<ToggleGroup 
					type="single" 
					size="sm" 
					value={selectedRon} 
					onValueChange={(e) => {
						setSelectedRon(e)
						context.updateRon(e)
				}}>	
					<ToggleGroupItem value="RON95">RON95</ToggleGroupItem>
					<ToggleGroupItem value="RON97">RON97</ToggleGroupItem>
				</ToggleGroup>
			</div>
		
			<div>
				<ToggleGroup 
					type="single" 
					size="sm" 
					value={selectedPreset} 
					onValueChange={(e) => {
						togglePreset(e)
						context.updateUnit(e)
				}}>
					<ToggleGroupItem value="RM">RM</ToggleGroupItem>
					<ToggleGroupItem value="L">Litre</ToggleGroupItem>
				</ToggleGroup>
			</div>
		</div>

		<Separator className="my-4" />

		<div>
			<ToggleGroup 
				type="single" 
				size="sm" 
				aria-required="true" 
				className="flex justify-between" 
				value={selectedValue} 
				onValueChange={ (e) => setSelectedValue(e)
			}>
				<ToggleGroupItem value="1">{preset[1]}</ToggleGroupItem>
				<ToggleGroupItem value="2">{preset[2]}</ToggleGroupItem>
				<ToggleGroupItem value="3">{preset[3]}</ToggleGroupItem>
				<ToggleGroupItem value="4">{preset[4]}</ToggleGroupItem>
				<ToggleGroupItem value="5">{preset[5]}</ToggleGroupItem>
			</ToggleGroup>
		</div>

		{ showCustom && <div className="space-y-1 flex items-center">
			{ (selectedPreset == "RM") && <div className="p-2">RM</div> }	
				<Input 
					type="number" 
					size={10} 
					id="custom" 
					placeholder={(selectedPreset === "L") ? "L" : "RM"} 
					onChange={(e) => setAmount(Number(e.target.value))
				} />	
			
			{ (selectedPreset == "L") && <div className="p-2">Litre</div> }
		</div> }

	</CardContent>

	<CardFooter>
		<div className="flex flex-col w-full gap-2 mt-2">
			<div className="flex flex-row">
				<div className="flex-grow flex-row">
		
					<Badge 
						className="rounded-r-none px-1" 
						style={{backgroundColor:"yellow", color:"black",borderColor:"black"}}>
						RON95
					</Badge>
		
					<Badge 
						variant={"outline"} 
						className="rounded-none" 
						style={{borderColor:"black"}}>
						{ priceData.ron95 != 0 ? "RM " + priceData.ron95 + "/L" : "Loading.." }
					</Badge>

					<Badge 
						className="rounded-none px-1" 
						style={{backgroundColor:"lightgreen", color:"black",borderColor:"black"}}>
						RON97
					</Badge>
						
					<Badge 
						variant={"outline"} 
						className="rounded-l-none" 
						style={{borderColor:"black"}}>
						{ priceData.ron97 != 0 ? "RM " + priceData.ron97 + "/L" : "Loading.." }
					</Badge>
					
				</div>
					
				<div>
					<Badge onClick={() => initPrice()}>Update</Badge></div>	
				</div>		
			<Button onClick={() => initAdd()} style={{textAlign:"center"}}>Log Entry</Button>
		</div>
	</CardFooter>
</Card>
)}

export default LogEntry