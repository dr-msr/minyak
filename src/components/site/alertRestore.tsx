import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { restoreFile } from "@/data/actions"
import { toast } from "sonner"
import { useState } from "react"
import { DataType, defaultData } from "@/data/version"
import { Textarea } from "@/components/ui/textarea"
import { convertData } from "@/data/conversion"
import { useData } from "@/data/context"

interface AlertRestoreProps {
	success : (value: boolean) => void;
}

  
export const AlertRestore : React.FC<AlertRestoreProps> = ( {success}) => {

	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState<string>("");	
	const [filename, setFilename] = useState<string | undefined>("");
	const [fileversion, setFileversion] = useState<string | undefined>("");
	const [parsedData, setParsedData] = useState<DataType["latest"] | null>(null);

	const context = useData();


	async function loadFile(input: React.ChangeEvent<HTMLInputElement>) {
		setFilename(input.target.files?.[0].name)
		restoreFile(input)
		.then((data) => {

			if (data.Version == undefined) {
				toast.error("Unable to find data version. Savefile data is not valid.");
				return
			}

			const convertedData = convertData(data)
			console.log(convertedData)


			if (convertedData) {
				setFileversion(convertedData.Version)
				setParsedData(convertedData)
				setIsOpen(true)
			} else {
				toast.error("No converted data");
			}
		})
		.catch((error) => {
			console.log(error)
			toast.error("Unable to read file. Make sure you uploaded the correct savefile.");
		})
		
	}

	function handleInit() {
		try {
			localStorage.setItem('data', JSON.stringify(parsedData));
			
			if (context.initData()) {
				setIsOpen(false)
				setValue("")
				toast.success("Savefile loaded successfully.");
				success(true)
			}
			
			
		} catch (error) {
			toast.error("Failed to load savefile. " + error)
		}
	}

	function handleCancel() {
		setIsOpen(false)
		setValue("")
	}
	
	return (
		<div>
			<Input id="savefile" type="file" value={value} onChange={(e) => loadFile(e)} /><AlertDialog open={isOpen}>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Restore Data</AlertDialogTitle>
					<AlertDialogDescription>

						{ parsedData ? (

						<div className="w-full p-2 border text-left max-h-[300px] overflow-scroll">
							<p><code>Loading... {filename} </code></p>
							<p><code>Savefile version : {fileversion} {"("}Latest : {defaultData.latest.Version}{")"}</code></p>
							<p><code>Updated at : {new Date(parsedData.UpdatedAt).toLocaleDateString("en-MY")}</code></p>
							<p><code>==========</code></p>
							<p><code>Importing...</code></p>
							{parsedData.Log.map((log, index) => {
    							return (
        						<p key={index}className="ml-2"><code>  {new Date(log.timestamp).toLocaleDateString("en-MY")} : {log.odometer} km</code></p>
    						)})}
							<p><code>{">> "} Total {parsedData.Log.length} rows loaded.</code></p>
							<p><code>==========</code></p>
							<p><code>Setting Configuration loaded.</code></p>

						</div> 
						
						) : (

							<div className="w-full p-2 border text-left">
							<p><code>Loaded... {filename} </code></p>
							<p><code>Savefile version : {fileversion} {"("}Latest : {defaultData.latest.Version}{")"}</code></p>
							<p><code>Your savefile version is outdated. Unfortunately no conversion tool is available. Please reach out to the developer to manually convert your data. </code></p>
						</div> 


						) }
						
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleInit}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
		</div>
	)
  }
  