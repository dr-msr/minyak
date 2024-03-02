
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export const OpenSource  = () => {

  return (
	<DialogContent className="sm:max-w-[425px]">
	<DialogHeader>
	  <DialogTitle>Open Source</DialogTitle>
	 
	</DialogHeader>

	<DialogDescription>
		Welcome to Minyak.Today
	  </DialogDescription>


	<DialogFooter>
		<DialogClose asChild>
			<Button>Close</Button>
        </DialogClose>
	</DialogFooter>
  </DialogContent>
  )
}
