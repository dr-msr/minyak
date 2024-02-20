'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardEntry from "./dashboardEntry"
import LogEntry from "./logEntry"


const MainEntry = () => {

return (
    <Tabs defaultValue="log" className="w-[400px]">

    	<TabsList className="grid w-full grid-cols-2">
        	<TabsTrigger value="log">Log Entry</TabsTrigger>
        	<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    	</TabsList>

    	<TabsContent value="log">
			<LogEntry />
		</TabsContent>

    	<TabsContent value="dashboard">
			<DashboardEntry />
      	</TabsContent>

    </Tabs>
)}

export default MainEntry
