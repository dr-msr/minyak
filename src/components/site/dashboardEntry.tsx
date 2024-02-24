
import { AnalyticsCard } from "./analytics";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { SetStateAction, useState } from "react";
import { useData } from "@/data/context";
import { PriceData } from "@/data/version";


const DashboardEntry = () => {

	const context = useData();
	const data = context.data.Log;
	

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);
	const reversedData = [...data].reverse();
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = reversedData.slice(indexOfFirstRecord, indexOfLastRecord);
	const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

	function handleDelete(id: string) {
		    if (window.confirm('Are you sure you want to delete this data?')) {
            		context.delLog(id);
        }
	}


	function getFuelingTemplate( data : {unit: string, value: number}, price : PriceData, ron : string) {

		var outputRM : number | string = ""
		var outputL : number | string = ""
		
		if (data.unit === "RM") {

			if (ron == "RON95") {
				outputRM = data.value
				outputL = (data.value / price.ron95).toFixed(2)
			} else if (ron == "RON97") {
				outputRM = data.value
				outputL = (data.value / price.ron97).toFixed(2)
			}

		} else if (data.unit === "L") {
			
			if (ron == "RON95") {
				outputL = data.value
				outputRM = (data.value * price.ron95).toFixed(2)
			} else if (ron == "RON97") {
				outputL = data.value
				outputRM = (data.value * price.ron97).toFixed(2)
			}

		}




		return (
			<div className="flex flex-col items-center justify-center">
				<Badge variant="outline"> RM {outputRM}</Badge>
				<Badge variant="outline" style={{border:'none'}}> {outputL} L</Badge>
			</div>	
		)
	}
	
	function getRonTemplate( displayRon : string, price : PriceData) {

		var styleBadge
		if (displayRon == "RON95") {
			styleBadge = {backgroundColor:'yellow', color:'black', borderColor:'black'}
		} else {
			styleBadge = {backgroundColor:'lightgreen', color:'black', borderColor:'black'}
		}

		var outputRM
		if (displayRon == "RON95") {
			outputRM = price.ron95
		} else {
			outputRM = price.ron97
		}

		var outputRon
		if (displayRon == "RON95") {
			outputRon = "RON 95"
		} else {
			outputRon = "RON 97"
		}

		return (
			<div>
				<Badge style={styleBadge}>{outputRon}</Badge>
				<Badge variant="outline" style={{border:'none'}}>RM {outputRM}</Badge></div>
		)

	}
	

	return (
		<Card>
		<CardHeader>
		  <CardTitle>Analytics</CardTitle>
		  <CardDescription>
			Data is everything.
		  </CardDescription>
		</CardHeader>
		

		<CardContent className="space-y-2">

			  { (data.length > 0) && <div><AnalyticsCard /></div> }

		<Table className="w-[700px]">
			<TableHeader>
	  <TableRow>
		<TableHead>Date & Time</TableHead>
		<TableHead className="w-[180px] text-center">Consumption (Trip) </TableHead>
		<TableHead className="w-[180px] text-center">Amount & Cost </TableHead>
		<TableHead>Odometer</TableHead>
		<TableHead className="w-[150px] text-center">RON & Price</TableHead>
	  </TableRow>
	</TableHeader>
<TableBody>
{currentRecords.map((data, index) => (
	  <TableRow key={index} onClick={(e) => handleDelete(data.id)}>
		  <TableCell className="flex flex-col justify-center items-center text-center"><div className=""><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleDateString("en-MY")}</Badge><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Badge></div></TableCell>
		  <TableCell className="text-center">{<div><Badge variant="destructive">{( (data.trip != 0) ? data.consumption.toFixed(1) + " km/L" : "0 km/L")}</Badge></div>}<Badge variant="outline">{( (data.trip != 0) ? (data.trip + " km") : "0 km")}</Badge></TableCell>
		  <TableCell className="text-right">{getFuelingTemplate(data.amount, data.price, data.ron)}</TableCell>
		  <TableCell className="items-center text-center"><Badge>{data.odometer}</Badge></TableCell>
		  <TableCell className="items-center text-center">{getRonTemplate(data.ron, data.price)}</TableCell>
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
	)}

export default DashboardEntry;