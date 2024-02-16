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
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { toast } from "sonner"

const setting = {
	odometer  : "000000",
	ron : "RON95",
	unit : "RM",
	preset_rm : {
		1 : "RM 10",
		2 : "RM 20",
		3 : "RM 50",
		4 : "RM 100",
		5 : "Other"
	},
	preset_litre : {
		1 : "10 L",
		2 : "20 L",
		3 : "50 L",
		4 : "100 L",
		5 : "Other"
	}
}

const price = {
	RON95 : 2.05,
	RON97 : 3.05
}

const defdata = [{
	timestamp : 0 as unknown as Date,
	odometer : 0,
	ron : "RON95",
	price : 2.05,
	amountRM : 10,
	amountLitre : 5
}]

export function LogEntry() {

	const [inputOdonto, setOdonto]	= useState(0)
	const [inputAmount, setAmount]	= useState(0)
	const [inputRM, setInputRM]		= useState(0)
	const [inputLitre, setInputLitre]	= useState(0)
	const [selectedRon, setSelectedRon] = useState(setting.ron)
	const [selectedPreset, selectPreset] = useState("")
	const [selectedValue, setSelectedValue] = useState("")
	const [showCustom, setShowCustom] = useState(false)

	const [preset, setPreset] = useState({
		1 : "RM 10",
		2 : "RM 20",
		3 : "RM 50",
		4 : "RM 100",
		5 : "Other"
	})

	const [data, setData] = useState(defdata)

	function initAdd() {
		if (inputOdonto == 0) {
			toast("Odometer cannot be empty.")
			return
		}
		const hariIni = new Date()
		setData([...data, {
			timestamp : hariIni,
			odometer : inputOdonto,
			ron : selectedRon,
			price : price[selectedRon as keyof typeof price],
			amountRM : inputRM,
			amountLitre : inputLitre
		}])
		toast("Fueling record has been created.")

	}
	
	function togglePreset(e : string) {
		if (e == "RM") {
			setPreset(setting.preset_rm)
			selectPreset("RM")
		} else if (e == "L") {
			setPreset(setting.preset_litre)
			selectPreset("L")
		}
	}



	useEffect(() => {
		if (setting.unit == "RM") {
			togglePreset("RM")
		} else if (setting.unit == "L") {
			togglePreset("L")
	}},[])

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
				setInputLitre(parseFloat((inputAmount / price.RON95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputLitre(parseFloat((inputAmount / price.RON97).toFixed(2)))
			}
			
		} else if (selectedPreset == "L") {
			setInputLitre(inputAmount)
			if (selectedRon == "RON95") {
				setInputRM(parseFloat((inputAmount * price.RON95).toFixed(2)))
			} else if (selectedRon == "RON97") {
				setInputRM(parseFloat((inputAmount * price.RON97).toFixed(2)))
			}
		}

	},[inputAmount, selectedPreset, selectedRon])

	
return (
    <Tabs defaultValue="log" className="w-[400px]">

    	<TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="log">Log Entry</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    	</TabsList>

    	<TabsContent value="log">
    		<Card>
        		<CardHeader>
        			<CardTitle>New Fueling</CardTitle>
        		</CardHeader>
          	<CardContent className="space-y-2">
			  <div className="flex justify-center items-center space-x-4 rounded-md border p-4">
						<div className="flex flex-col gap-1">
						<div><Badge>RON 95</Badge><Badge variant={"outline"}>RM {price.RON95} /L</Badge></div>
						<div><Badge>RON 97</Badge><Badge variant={"outline"}>RM {price.RON97} /L</Badge></div>
						</div>
						<div><Badge variant={"destructive"} style={{backgroundColor:"green"}}>Update</Badge></div>
				    </div> 

            
			<div className="space-y-1">
				<Label htmlFor="name">Odometer</Label>
				<Input autoFocus type="number" id="odometer" placeholder={setting.odometer} value={inputOdonto} onChange={(e) => setOdonto(Number(e.target.value))} />
			</div>


			<div className="flex justify-between">
				<div>
				<ToggleGroup type="single" size="sm" defaultValue={selectedRon} onValueChange={(e) => setSelectedRon(e)}>
					<ToggleGroupItem value="RON95">RON95</ToggleGroupItem>
					<ToggleGroupItem value="RON97">RON97</ToggleGroupItem>
				</ToggleGroup>
				</div>
				<div>
				<ToggleGroup type="single" size="sm" defaultValue={setting.unit} onValueChange={(e) => togglePreset(e)}>
					<ToggleGroupItem value="RM">RM</ToggleGroupItem>
					<ToggleGroupItem value="L">Litre</ToggleGroupItem>
				</ToggleGroup>
				</div>
			</div>

			<Separator className="my-4" />

			<div>
				<ToggleGroup type="single" size="sm" aria-required="true" className="flex justify-between" onValueChange={ (e) => setSelectedValue(e)}>
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
            <Button onClick={() => initAdd()} style={{textAlign:"center"}}>Save changes</Button>
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

		  <Table className="w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Odometer</TableHead>
          <TableHead className="w-[150px] text-center">RON & Price</TableHead>
		  <TableHead className="w-[180px] text-right">Amount & Cost </TableHead>
        </TableRow>
      </TableHeader>
<TableBody>
	{data.map((data, index) => (
		<TableRow key={index}>
			<TableCell> {new Date(data.timestamp).toLocaleDateString("en-MY")}</TableCell>
			<TableCell>{data.odometer}</TableCell>
			<TableCell className="items-center text-center">{<div><Badge style={data.ron === "RON95" ? {backgroundColor:'yellow', color:'black', borderColor:'black', borderRadius:0} : {backgroundColor:'lightgreen', color:'black', borderColor:'black', borderRadius:0}}>{data.ron}</Badge><Badge variant="outline" style={{border:'none'}}>RM {data.price}</Badge></div>}</TableCell>
			<TableCell className="text-right">{<div><Badge variant="outline">{data.amountLitre.toFixed(2)} L : RM {data.amountRM}</Badge></div>}</TableCell>
		</TableRow>
	))}
</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Mileage</TableCell>
          <TableCell className="text-right">15.3 km/l</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
           
		   


          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

    </Tabs>
  )
}
