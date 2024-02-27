'use client'

import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { AlertRestore } from "../site/alertRestore"
import { useData } from "@/data/context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { defaultData } from "@/data/version";

interface ResetDataProps {
	success : (value: boolean) => void;
}




export const ResetData : React.FC<ResetDataProps> = ({success}) => {
	const [disable, setDisable] = useState(true);
	const [count, setCount] = useState(5);
	const context = useData();
	const rt = useRouter();

	

	function handleReset() {
		
		try {

			if (context.initData()) {
				toast.success("Database cleared. New data reinitiated successfully.");
				success(true)
			}
			
			
		} catch (error) {
			console.log(error)
			toast.error("Failed to load reset data. " + error)
		}
	}


	useEffect(() => {
		const timer = setTimeout(() => {
		  if (count === 0) {
			setDisable(false);
		  } else {
			setCount(count - 1);
		  }
		}, 1000);
	
		return () => clearTimeout(timer);
	  }, [count]); 
	
	return (
		<DialogContent className="sm:max-w-[425px]">
		<DialogHeader>
		  <DialogTitle>Reset Data</DialogTitle>
		  <DialogDescription>
			Your current data will be deleted. You will start with a new, empty database. 
		  </DialogDescription>
		</DialogHeader>

		<DialogFooter>

		<Button disabled={disable} variant={"destructive"} className="flex-grow" onClick={() => handleReset()}>Reset Data {disable && "(" + count + ")"}</Button>			
			<DialogClose asChild>
				<Button type="submit">Cancel</Button>
			</DialogClose>
		</DialogFooter>
	  </DialogContent>
	  )
}