'use client'

import  DataConversion from "@/components/site/dataConversion";
import { Footer } from "@/components/site/footer";
import MainEntry from "@/components/site/mainEntry";
import { useData } from "@/data/context";
import { useEffect, useState } from "react";

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
					<p>Loading...</p>
				)}
	  </main>
	);
  }
  