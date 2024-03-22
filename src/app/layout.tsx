
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { DataProvider } from "@/data/context";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryClientProvider } from "@/lib/queryProvider";


const fontSans = Inter({ 
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: "Minyak.Today",
	description: "Calculate And Track Your Fuel Consumption",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const queryClient = new QueryClient()

	return (
		<html lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/favico/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png" />
				<link rel="manifest" href="/favico/site.webmanifest" />
			<script defer src="https://analytics.eu.umami.is/script.js" data-website-id="73eb3fc3-3fe2-4bb7-8ed1-07be7a6acd0f"></script>
			</head>
		<body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
			<ReactQueryClientProvider>
				<DataProvider>{children}</DataProvider>      
				<Toaster richColors  />
				<Analytics />
			</ReactQueryClientProvider>
		</body>
    	</html>
)}
