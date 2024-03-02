
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export const AboutDRMSR  = () => {

  return (
	<DialogContent className="sm:max-w-[425px]">
	<DialogHeader>
	  <DialogTitle>About DRMSR</DialogTitle>
	 
	</DialogHeader>

	<DialogDescription>
		Who is DRMSR
	  </DialogDescription>


	<DialogFooter>
		<DialogClose asChild>
			<Button>Close</Button>
        </DialogClose>
	</DialogFooter>
  </DialogContent>
  )
}
