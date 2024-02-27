
export const CarMove = () => {
	return (
		<Lottie
			options = {{
				loop: true,
				autoplay: true,
				animationData: carAnim,
				rendererSettings: {
					preserveAspectRatio: "xMidYMid slice"
				}
			}}
			height={200}
			width='100%'
			style={{marginBottom: '1rem'}} 
		/>
	)
}
