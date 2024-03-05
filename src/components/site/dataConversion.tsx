import { BellIcon, CheckIcon, DownloadIcon, UploadIcon } from "@radix-ui/react-icons"
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
import { backupData, exportCSV, exportHTML, restoreFile } from "@/data/actions"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { AlertRestore } from "./alertRestore"
import { FileCode2, Sheet, UploadCloud } from "lucide-react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { MenubarItem } from "../ui/menubar"
import { RestoreFile } from "../footer_dialog/restoreFile"

interface DataConversionProps {
	success: (value: boolean) => void;

}

const DataConversion : React.FC <DataConversionProps> = ( {success}) => {
	const [loadData, setLoadData] = useState<DataType["any"]>({
		Version : "Not Available"
	})
	const [convertedData, setConvertedData] = useState<DataType["latest"] | null>(null)
	const [parsedFile, setParsedFile] = useState<DataType["latest"] | null>(null)
	const context = useData();
	const [successLoad, setSuccessLoad] = useState(false);
	const [closeRestore, setCloseRestore] = useState(false);

	


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
		})
		}
	, [,successLoad])

	useEffect(() => {
		const newData : DataType["latest"] | null = convertData(loadData)
		setConvertedData(newData)

	},[loadData]
	)
	




	function initConversion(): void {

			

		if (convertedData) {
			try {
				localStorage.setItem('data', JSON.stringify(convertedData));
				
				if (context.initData()) {
					success(true)
				}
				
				
			} catch (error) {
				toast.error("Failed to convert data. " + error)
			}

		} else {
			context.emptyData(),
			toast.success("Data has been reset.")
			success(true);
		}
	}

	async function initBackup() {

		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = backupData(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	}



	async function initCSV() {
		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = exportCSV(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}		
	}

	async function initHTML() {
		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = exportHTML(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
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
		  		<div className="text-sm text-muted-foreground flex flex-col gap-2 mb-2 text-justify">

					<div className="flex flex-row justify-between">
						<p>Local Version : </p><Badge>{loadData.Version ? loadData.Version : "Not Available"}</Badge>
					</div>

					<div className="flex flex-row justify-between">
						<p>Current Version : </p><Badge>{defaultData.latest.Version}</Badge>
					</div>

					<div className="flex flex-row justify-between">
						<p>Conversion Tool : </p> { convertedData ? (<Badge className="bg-green-700">Available</Badge>) : ( <Badge className="bg-red-700">Not Available</Badge>) }
					</div>

					<div className="mt-2">

					{ !loadData.Version ? (
						<div>
						<div>Unable to detect the data structure.</div>
						<div className="mt-1.5">Please choose {"["}Restore{"]"} to load data from existing savefile or {"["}Initiate Fresh Data{"]"} to begin with empty database.</div>
					</div>) : convertedData ? (
						<div>
							<p>A conversion tool is available.</p>
							<p>Please make a backup of your data before proceeding.</p>
						</div>
						) : (
						<div>
							<div>A conversion tool is not available.</div>
							<div className="mt-1.5">Please choose {"["}Restore{"]"} to load data from existing savefile or {"["}Initiate Fresh Data{"]"} to begin with empty database.</div>
						</div>) 
						}

					</div>

			
		</div>

          </div>
        </div>


	


       
	<Command className="rounded-lg border shadow-md">
      <CommandList>
        <CommandGroup heading= { loadData.Version ? "Data Savefile" : "Restore" }>
          { loadData.Version && <CommandItem onSelect={() => initBackup()}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            <span>Backup</span>
          </CommandItem> }
			
		  <Dialog open={closeRestore} onOpenChange={setCloseRestore}>
						<DialogTrigger asChild>
							<CommandItem onSelect={() => setCloseRestore(true)}>
							<UploadIcon className="mr-2 h-4 w-4" />

								Restore
							</CommandItem>
						</DialogTrigger>
						<RestoreFile close={(value) => {
							setCloseRestore(!value);
							success(value)
						} } />
					</Dialog>


        </CommandGroup>
        <CommandSeparator />
        { loadData.Version && <CommandGroup heading="Export Data">
          <CommandItem onSelect={() => initCSV()}>
            <Sheet className="mr-2 h-4 w-4" />
            <span>CSV</span>
          </CommandItem>
          <CommandItem onSelect={() => initHTML()}>
            <FileCode2 className="mr-2 h-4 w-4" />
            <span>HTML</span>
          </CommandItem>
        </CommandGroup> }
      </CommandList>
    </Command>


      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => initConversion()}>
          <CheckIcon className="mr-2 h-4 w-4" /> { convertedData ? ("Begin Conversion") : ("Initiate Fresh Data") }
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DataConversion