import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon,
  } from "@radix-ui/react-icons"
   
  import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
  } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import { DataType, defaultData } from "@/data/version"
import { convertData } from "@/data/conversion"
import { useData } from "@/data/context"
import { toast } from "sonner"

interface DataConversionProps {
	success: (value: boolean) => void;

}

const DataConversion : React.FC <DataConversionProps> = ( {success}) => {
	const [loadData, setLoadData] = useState<DataType["any"]>({
		Version : "Not Available"
	})
	const [convertedData, setConvertedData] = useState<DataType["latest"] | null>(null)
	const context = useData();
	


	async function getData() {
		    try {
		        let dataString = localStorage.getItem('data');
		        return dataString ? JSON.parse(dataString) : [{Version : "Not Available"}];
		    } catch (error) {
				return [{Version : "Not Available"}];
		    }}

	useEffect(() => {
		getData().then((data) => {
			setLoadData(data);
			console.log(data)
		})
		}
	, [])

	useEffect(() => {
		const newData : DataType["latest"] | null = convertData(loadData)
		setConvertedData(newData)

	},[loadData]
	)
	




	function initConversion(): void {
		if (convertedData) {
			localStorage.setItem('data', JSON.stringify(convertedData));
			success(true);
		
		} else {
			context.emptyData(),
			toast.success("Data has been reset.")
			success(true);
		}
	}

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Minyak.Today</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Incompatible Data Structure
            </p>
            <p className="text-sm text-muted-foreground">We detected that there is an existing data in place.</p>
          </div>
        </div>

		<div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
		  <div className="text-sm text-muted-foreground flex flex-col gap-2 mb-2">

			<div className="flex flex-row justify-between">
				<p>Local Version : </p><Badge>{loadData.Version ? loadData.Version : "Not Available"}</Badge>
			</div>

			<div className="flex flex-row justify-between">
				<p>Current Version : </p><Badge>{defaultData.latest.Version}</Badge>
			</div>

			<div className="flex flex-row justify-between">
				<p>Conversion Tool : </p> { convertedData ? (<Badge className="bg-green-700">Available</Badge>) : ( <Badge className="bg-red-700">Not Available</Badge>) }
			</div>
			
			</div>

			{ convertedData ? (<p className="text-sm text-muted-foreground">A conversion tool is available. Please make a backup of your data before proceeding.</p>) : (<p className="text-sm text-muted-foreground">A conversion tool is not available. We will reinitiate with a fresh data.</p>) }
          </div>
        </div>


	


       
	    <Command className="rounded-lg border shadow-md">
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Backup Data</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Export Data">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>CSV</span>
          </CommandItem>
          <CommandItem>
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            <span>PDF</span>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>HTML</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>


      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => initConversion()}>
          <CheckIcon className="mr-2 h-4 w-4" /> { convertedData ? ("Begin Conversion") : ("Load New Data") }
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DataConversion