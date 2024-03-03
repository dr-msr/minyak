
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card } from "../ui/card"
import { FacebookShare, TwitterShare, WhatsappShare } from 'react-share-kit'



const description = "Minyak.today is a free, fully web-based application designed for vehicle owners in Malaysia. The app allows users to log their fueling sessions, and it automatically calculates their fuel consumption rate." 

const Desc = () => {
	return (
		<Card>
		<div className="p-2 text-left">
			<p>{description}</p>
		</div>
		</Card>
	)

}


const Features = () => {
	return (
		<Card>
		<div className="p-2 text-left">
			<h2 style={{fontWeight:"bold"}}>Features</h2>
			<ul>
				<li>• Log fueling sessions</li>
				<li>• Calculate fuel consumption rate</li>
				<li>• View fuel consumption history</li>
				<li>• View fuel consumption statistics</li>
				<li>• Backup and export your data</li>

			</ul>
		</div>
		</Card>
	)
} 

const HealthMetrics = () => {
	return (
		<Card>
		<div className="p-2 text-left">
			<h2 style={{fontWeight:"bold"}}>Metrics</h2>
			<p>Pageviews today : </p>
			<p>Visitors today : </p>
			<p>Average visit duration : </p>
		</div>
		</Card>
	)
}

const Share = () => {
	return (
		<div className="flex flex-col p-2 gap-2 justify-center items-center">
			Share On
			<div className="flex flex-row gap-2">


			<Button size="sm" variant="outline"><FacebookShare
  				url={'https://minyak.today'}
  				quote={'Minyak.Today - Calculate And Track Your Fuel Consumption'}
  				hashtag={'#minyaktoday'}
				buttonTitle="Facebook"
			/></Button>

			<Button size="sm" variant="outline"><TwitterShare
				url="https://minyak.today"
				title="Minyak.Today - Calculate And Track Your Fuel Consumption"
				buttonTitle="Twitter"
			/></Button>

			<Button size="sm" variant="outline"><WhatsappShare
				url="https://minyak.today"
				title="Minyak.Today - Calculate And Track Your Fuel Consumption"
				separator=" :: "
				buttonTitle="Whatsapp"
			/></Button>

			</div>
		</div>
	)
}

				

export const AboutApp  = () => {


  return (
	<DialogContent className="sm:max-w-[425px]">
	<DialogHeader>
	  <DialogTitle>About Minyak.Today</DialogTitle>
	 
	</DialogHeader>

	<DialogDescription className="text-center">
	<button className="bg-white bg-opacity-0.5" style={{
			fontFamily: "Open Sans", 
			fontSize: 16, 
			letterSpacing: 2, 
			textDecoration: 'none', 
			textTransform: 'uppercase', 
			color: '#000', 
			cursor: 'pointer', 
			border: '3px solid', 
			paddingLeft: '10px',
			paddingRight: '10px', 
			boxShadow: '1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px', 
			position: 'relative', 
			userSelect: 'none', 
			WebkitUserSelect: 'none', 
			touchAction: 'manipulation'
		}}>Minyak . Today</button>
		<div className="flex flex-col gap-2 mt-4">
		

			<Desc />
			<Features />
			<HealthMetrics />
			<Share />
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
