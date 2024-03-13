/**
 * AboutApp displays information about the app in a dialog.
 *
 * It shows a description, features list, metrics, and configurations.
 * It also contains social share buttons.
 *
 * Props:
 * - dbVersion: Database version string
 * - uid: User ID string
 */

import { Button } from '@/components/ui/button';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '../ui/card';
import { FacebookShare, TwitterShare, WhatsappShare } from 'react-share-kit';
import React, { useEffect, useState } from 'react';
import { WebsiteActive, WebsiteStats } from '@umami/api-client';
import { Skeleton } from '../ui/skeleton';
import * as packageJson from '../../../package.json';
import { updateActive, updateStats } from '@/lib/server';

const description =
	'Minyak.today is a free, fully web-based application designed for vehicle owners in Malaysia. The app allows users to log their fueling sessions, and it automatically calculates their fuel consumption rate.';
const appVersion = packageJson.version;

const Desc = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<p>{description}</p>
			</div>
		</Card>
	);
};

const Features = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<h2 style={{ fontWeight: 'bold' }}>Features</h2>
				<ul>
					<li>• Log fueling sessions</li>
					<li>• Retrieve & view latest fuel price</li>
					<li>• Calculate fuel consumption rate</li>
					<li>• View fuel consumption history</li>
					<li>• View fuel consumption statistics</li>
					<li>• Backup and export your data</li>
				</ul>
			</div>
		</Card>
	);
};

const Share = () => {
	return (
		<div className='flex flex-col p-2 gap-2 justify-center items-center'>
			Share On
			<div className='flex flex-row gap-2'>
				<Button size='sm' variant='outline'>
					<FacebookShare
						url={'https://minyak.today'}
						quote={
							'Minyak.Today - Calculate And Track Your Fuel Consumption'
						}
						hashtag={'#minyaktoday'}
						buttonTitle='Facebook'
					/>
				</Button>

				<Button size='sm' variant='outline'>
					<TwitterShare
						url='https://minyak.today'
						title='Minyak.Today - Calculate And Track Your Fuel Consumption'
						buttonTitle='Twitter'
					/>
				</Button>

				<Button size='sm' variant='outline'>
					<WhatsappShare
						url='https://minyak.today'
						title='Minyak.Today - Calculate And Track Your Fuel Consumption'
						separator=' :: '
						buttonTitle='Whatsapp'
					/>
				</Button>
			</div>
		</div>
	);
};

interface AboutProps {
	dbVersion: string;
	uid: string | undefined;
}

export const AboutApp: React.FC<AboutProps> = ({ dbVersion, uid }) => {
	const [active, setActive] = useState<WebsiteActive | null>(null);
	const [stats, setStats] = useState<WebsiteStats | null>(null);

	function getAverageTime(stats: WebsiteStats) {
		const averageseconds =
			stats.totaltime.value /
			(stats.pageviews.value - stats.bounces.value);
		const minutes = Math.floor(averageseconds / 60);
		const seconds = Math.floor(averageseconds % 60);
		return `${minutes}m ${seconds}s`;
	}

	const HealthMetrics = () => {
		return (
			<Card>
				{stats ? (
					<div className='p-2 text-left'>
						<h2 style={{ fontWeight: 'bold' }}>Metrics</h2>
						<p>Currently online : {active && active.x} </p>
						<p>
							Pageviews today : {stats && stats.pageviews.value}{' '}
						</p>
						<p>
							Unique visitors today :{' '}
							{stats && stats.uniques.value}
						</p>
						<p>
							Average visit duration :{' '}
							{stats && getAverageTime(stats)}{' '}
						</p>
					</div>
				) : (
					<div className='p-2 text-left'>
						<h2 style={{ fontWeight: 'bold' }}>Metrics</h2>
						<Skeleton className='w-[100px] h-4 mt-2' />
						<Skeleton className='w-[110px] h-4 mt-2' />
						<Skeleton className='w-[120px] h-4 mt-2' />
						<Skeleton className='w-[150px] h-4 mt-2' />
					</div>
				)}
			</Card>
		);
	};

	const today = new Date();

	const AppConfig = () => {
		return (
			<Card>
				<div className='p-2 text-left'>
					<h2 style={{ fontWeight: 'bold' }}>Configurations</h2>
					<div className='w-full p-2 text-left leading-none bg-gray-100 mt-2'>
						<p>
							<div className='flex flex-row justify-between'>
								<div>
									<code>User ID : </code>
								</div>
								<div>
									<code>{uid != undefined && uid}</code>
								</div>
							</div>
						</p>
						<p>
							<div className='flex flex-row justify-between'>
								<div>
									<code>App Version : </code>
								</div>
								<div>
									<code>{appVersion}</code>
								</div>
							</div>
						</p>
						<p>
							<div className='flex flex-row justify-between'>
								<div>
									<code>Database Version : </code>
								</div>
								<div>
									<code>{dbVersion}</code>
								</div>
							</div>
						</p>
						<p>
							<div className='flex flex-row justify-between'>
								<div>
									<code>Updated : </code>
								</div>
								<div>
									<code>
										{today.toLocaleDateString('en-MY')}
									</code>
								</div>
							</div>
						</p>
					</div>
				</div>
			</Card>
		);
	};

	useEffect(() => {
		updateActive().then((res) => {
			setActive(res);
		});
		updateStats().then((res) => {
			setStats(res);
		});
	}, []);

	return (
		<DialogContent className='sm:max-w-[425px] max-h-[70vh] overflow-y-auto'>
			<DialogHeader>
				<DialogTitle>About Minyak.Today</DialogTitle>
			</DialogHeader>

			<DialogDescription className='text-center'>
				<button
					className='bg-white bg-opacity-0.5'
					style={{
						fontFamily: 'Open Sans',
						fontSize: 16,
						letterSpacing: 2,
						textDecoration: 'none',
						textTransform: 'uppercase',
						color: '#000',
						cursor: 'pointer',
						border: '3px solid',
						paddingLeft: '10px',
						paddingRight: '10px',
						boxShadow:
							'1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px',
						position: 'relative',
						userSelect: 'none',
						WebkitUserSelect: 'none',
						touchAction: 'manipulation',
					}}
				>
					Minyak . Today
				</button>

				<div className='flex flex-col gap-2 mt-4'>
					<Desc />
					<Features />
					<HealthMetrics />
					<AppConfig />
					<Share />
				</div>
			</DialogDescription>

			<DialogFooter>
				<DialogClose asChild>
					<Button>Close</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};
