'use client'

import { Footer } from "@/components/site/footer";
import MainEntry from "@/components/site/mainEntry";
import { useData } from "@/data/context";
import { useEffect } from "react";

export default function Home() {

	const context = useData();

	useEffect(() => {
		context.initData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
	  <main className="flex min-h-screen flex-col items-center justify-between p-2">
			<MainEntry />
			<Footer />
	  </main>
	);
  }
  