import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { DataProvider } from "@/data/context";


const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
  })



export const metadata: Metadata = {
  title: "Minyak.Today",
  description: "Calculate And Track Your Fuel Consumption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
		<head>
		<link rel="apple-touch-icon" sizes="180x180" href="/favico/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png" />
		<link rel="manifest" href="/favico/site.webmanifest" />
		</head>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
		<DataProvider>{children}</DataProvider>      
	  <Toaster richColors  />
</body>
    </html>
  );
}
