import animationData from './../../../public/car.json'
import Lottie from "react-lottie";

const CarAnimation =  () => {
	return ( 
		<Lottie
		isClickToPauseDisabled={true}
		options = {{
		  loop: true,
		  autoplay: true,
		  animationData: animationData,
		}}
		height='100%'
		width='100%'
		/>
)}

const Header = () => {
	return (
		<div className='w-[400px] mb-[116px] flex justify-center'>
			<div id="car animation" style={{position : 'absolute', zIndex:1, width:425, height:116}}>
				<CarAnimation />
			</div>
			<div id="title" className="text-center mt-[20px]" style={{
				position : 'absolute', 
				zIndex:2, 			
			}}>	
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
			</div>
		</div>
)}

export default Header

