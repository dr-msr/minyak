'use client'

import  DataConversion from "@/components/site/dataConversion";
import { Footer } from "@/components/site/footer";
import Header from "@/components/site/header";
import MainEntry from "@/components/site/mainEntry";
import { useData } from "@/data/context";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Text } from "@tremor/react"

export default function Home() {

	const context = useData();
	const [isLoading, setIsLoading] = useState(true);
	const [isData, setIsData] = useState(false)

	useEffect(() => {
		setIsData(context.initData());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		context.initData();
		setIsLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps	
	},[isData])

	return (
	  <main className="flex min-h-screen flex-col items-center justify-between p-2">
		{ !isLoading ? (
			 isData ? ( 
				<>
					<MainEntry />
					<Footer />

				</> 
				) : (
					<DataConversion success={setIsData} />
					
				) ) : (
					<div className='w-[400px] mb-[116px] flex justify-center'>

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
				}}>  Loading...  </button>
		
		
		
					</div>
				</div>
				)}
	  </main>
	);
  }
  