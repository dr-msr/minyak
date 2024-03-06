
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'
import profilePic from '../../../public/drmsr.jpg'




export const AboutDRMSR  = () => {

  return (
	<DialogContent className="sm:max-w-[425px]">
	<DialogHeader>
	  <DialogTitle>About DRMSR</DialogTitle>
	 
	</DialogHeader>

	<DialogDescription>
		<div className="flex items-center justify-center">
			<Image
			src={profilePic}
			width={200}
			height={200}
			alt="drmsr.dev"
			className="rounded-full"
			/>
		</div>
	  </DialogDescription>


	<DialogFooter>
		<DialogClose asChild>
			<Button>Close</Button>
        </DialogClose>
	</DialogFooter>
  </DialogContent>
  )
}
