
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
import { Card } from "../ui/card"
import { useData } from "@/data/context"




export const AboutDRMSR  = () => {

	const context = useData()

  return (
	<DialogContent className="sm:max-w-[425px]">
	<DialogHeader>
	  <DialogTitle>About DRMSR</DialogTitle>
	 
	</DialogHeader>

	<DialogDescription>
		<div className="flex flex-col gap-2 items-center justify-center">
			<Image
			src={profilePic}
			width={100}
			height={100}
			alt="drmsr.dev"
			className="rounded-full"
			/>
			<div>
				<Card>
					<p className="text-sm p-2">My name is Syamirul. I am a budding developer based in Kuala Lumpur, Malaysia.</p>
				</Card>
			</div>
			<div>
				<Button variant="link" onClick={() => window.open("https://drmsr.dev", "_blank")}>Website</Button>
				<Button variant="link" onClick={() => window.open("https://github.com/dr-msr", "_blank")}>Github</Button>
				<Button variant="link" onClick={() => window.open("https://twitter.com/drmsr_dev", "_blank")}>Twitter (X)</Button>
				<Button variant="link" onClick={() => window.open("https://ko-fi.com/W7W6VBA89", "_blank")}>Ko-Fi</Button>
			</div>
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
