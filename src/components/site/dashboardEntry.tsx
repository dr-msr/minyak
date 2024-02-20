
import { AnalyticsCard } from "./analytics";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { SetStateAction, useState } from "react";
import { Data } from "@/lib/types";
import { useData } from "@/data/context";


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
		<TableHead>Odometer</TableHead>
		<TableHead className="w-[150px] text-center">RON & Price</TableHead>
		<TableHead className="w-[180px] text-right">Amount & Cost </TableHead>
	  </TableRow>
	</TableHeader>
<TableBody>
{currentRecords.map((data, index) => (
	  <TableRow key={index} onClick={(e) => context.delLog(data.id)}>
		  <TableCell className="flex flex-col justify-center items-center text-left"><div className=""><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleDateString("en-MY")}</Badge><Badge variant="outline" className="border-none">{new Date(data.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Badge></div></TableCell>
		  <TableCell className="text-center">{<div><Badge variant="destructive">{( (data.trip != 0) ? data.consumption.toFixed(1) + " km/L" : "0 km/L")}</Badge></div>}<Badge variant="outline">{( (data.trip != 0) ? (data.trip + " km") : "0 km")}</Badge></TableCell>
		  <TableCell className="items-center text-center"><Badge>{data.odometer}</Badge></TableCell>
		  <TableCell className="items-center text-center">{<div><Badge style={data.ron === "RON95" ? {backgroundColor:'yellow', color:'black', borderColor:'black'} : {backgroundColor:'lightgreen', color:'black', borderColor:'black'}}>{data.ron}</Badge><Badge variant="outline" style={{border:'none'}}>RM {data.price}</Badge></div>}</TableCell>
		  <TableCell className="text-right">{<div><Badge variant="outline">{data.amountLitre.toFixed(2)} L : RM {((Math.ceil(data.price * data.amountLitre * 100) / 100).toFixed(2))}</Badge></div>}</TableCell>
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