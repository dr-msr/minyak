/**
 * Renders the main entry point for the app using Tabs component for navigation.
 * Allows swiping between LogEntry and Dashboard tabs.
 * Renders Header, LogEntry, DashboardEntry, FrontNews, FrontPost components.
 * Manages current tab state with useState hook.
 */

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

import DashboardEntry from './dashboardEntry';
import LogEntry from './logEntry';
import Header from './header';
import FrontNews from './frontnews';
import FrontPost from './frontpost';

const MainEntry = () => {
	const [currentContent, setCurrentContent] = useState('log');
	const swipez = useSwipeable({
		onSwipedRight: () => setCurrentContent('log'),
		onSwipedLeft: () => setCurrentContent('dashboard'),
	});

	return (
		<Tabs
			orientation='horizontal'
			defaultValue='log'
			value={currentContent}
			onValueChange={(value) => setCurrentContent(value)}
			className='w-[400px]'
		>
			<Header />

			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='log'>Log Entry</TabsTrigger>
				<TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
			</TabsList>

			<TabsContent value='log'>
				<div {...swipez} className='flex flex-col h-full'>
					<div className='flex flex-col gap-2'>
						<LogEntry />
						<FrontNews news={[]} />
						<FrontPost />
					</div>
				</div>
			</TabsContent>

			<TabsContent value='dashboard'>
				<DashboardEntry />
			</TabsContent>
		</Tabs>
	);
};

export default MainEntry;
