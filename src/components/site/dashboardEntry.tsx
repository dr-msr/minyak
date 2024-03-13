/**
 * DashboardEntry component renders analytics data in a card.
 * It fetches data from context API and processes it to display in a table.
 * Allows filtering data by date range. Paginates data.
 * Contains utility functions to process data for display.
 */

import { AnalyticsCard } from './analytics';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { SetStateAction, useEffect, useState } from 'react';
import { useData } from '@/data/context';
import { Log, PriceData } from '@/data/version';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';

const DashboardEntry = () => {
	const context = useData();
	const rawdata = context.data.Log;
	const [data, setData] = useState(rawdata);

	const [date, setDate] = useState<DateRange | undefined>({
		from: rawdata[0]?.timestamp,
		to: rawdata[rawdata.length - 1]?.timestamp,
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);
	const reversedData = [...data].reverse();
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = reversedData.slice(
		indexOfFirstRecord,
		indexOfLastRecord
	);
	const paginate = (pageNumber: SetStateAction<number>) =>
		setCurrentPage(pageNumber);

	function handleDelete(id: string) {
		if (window.confirm('Are you sure you want to delete this data?')) {
			context.delLog(id);
		}
	}

	function handleRange(target: string) {
		const today = new Date();
		switch (target) {
			case '1w': {
				setDate({
					from: addDays(today, -7),
					to: today,
				});
				break;
			}
			case '1m': {
				setDate({
					from: addDays(today, -30),
					to: today,
				});
				break;
			}
			case '3m': {
				setDate({
					from: addDays(today, -90),
					to: today,
				});
				break;
			}
			case '6m': {
				setDate({
					from: addDays(today, -180),
					to: today,
				});
				break;
			}
			case '1y': {
				setDate({
					from: addDays(today, -365),
					to: today,
				});
				break;
			}
			case 'ALL': {
				setDate({
					from: rawdata[0]?.timestamp,
					to: today,
				});
				break;
			}
		}
	}

	const DatePick = () => {
		return (
			<div className='flex flex-col items-center justify-center'>
				<div className='flex justify-center'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id='date'
								variant={'outline'}
								className={
									'w-[300px] justify-center text-left font-normal'
								}
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, 'LLL dd, y')} -{' '}
											{format(date.to, 'LLL dd, y')}
										</>
									) : (
										format(date.from, 'LLL dd, y')
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0' align='start'>
							<Calendar
								initialFocus
								mode='range'
								defaultMonth={date?.from}
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className='flex flex-row justify-around w-[300px] text-sm mb-2'>
					<div
						className='hover:underline'
						onClick={() => handleRange('1w')}
					>
						1w
					</div>
					<div
						className='hover:underline'
						onClick={() => handleRange('1m')}
					>
						1m
					</div>
					<div
						className='hover:underline'
						onClick={() => handleRange('3m')}
					>
						3m
					</div>
					<div
						className='hover:underline'
						onClick={() => handleRange('6m')}
					>
						6m
					</div>
					<div
						className='hover:underline'
						onClick={() => handleRange('1y')}
					>
						1y
					</div>
					<div
						className='hover:underline'
						onClick={() => handleRange('ALL')}
					>
						ALL
					</div>
				</div>
			</div>
		);
	};

	function getFuelingTemplate(
		data: { unit: string; value: number },
		price: PriceData,
		ron: string
	) {
		var outputRM: number | string = '';
		var outputL: number | string = '';

		if (data.unit === 'RM') {
			if (ron == 'RON95') {
				outputRM = data.value;
				outputL = (data.value / price.ron95).toFixed(2);
			} else if (ron == 'RON97') {
				outputRM = data.value;
				outputL = (data.value / price.ron97).toFixed(2);
			}
		} else if (data.unit === 'L') {
			if (ron == 'RON95') {
				outputL = data.value;
				outputRM = (data.value * price.ron95).toFixed(2);
			} else if (ron == 'RON97') {
				outputL = data.value;
				outputRM = (data.value * price.ron97).toFixed(2);
			}
		}
		return {
			outputRM: outputRM,
			outputL: outputL,
		};
	}

	function getRonTemplate(displayRon: string, price: PriceData) {
		var styleBadge;
		if (displayRon == 'RON95') {
			styleBadge = {
				backgroundColor: 'yellow',
				color: 'black',
				borderColor: 'black',
			};
		} else {
			styleBadge = {
				backgroundColor: 'lightgreen',
				color: 'black',
				borderColor: 'black',
			};
		}

		var outputRM;
		if (displayRon == 'RON95') {
			outputRM = price.ron95;
		} else {
			outputRM = price.ron97;
		}

		var outputRon;
		if (displayRon == 'RON95') {
			outputRon = 'RON 95';
		} else {
			outputRon = 'RON 97';
		}

		return (
			<div>
				<Badge style={styleBadge}>{outputRon}</Badge>
				<Badge variant='outline' style={{ border: 'none' }}>
					RM{outputRM}
				</Badge>
			</div>
		);
	}

	useEffect(() => {
		var filterData = rawdata;
		var draftData: Log[] = [];
		var dateFrom = new Date();
		var dateTo = new Date();

		if (
			date != undefined &&
			date.from != undefined &&
			date.to != undefined
		) {
			dateFrom = date.from;
			dateTo = date.to;
		}

		var dateFromTimestamp = new Date(dateFrom).getTime();
		var dateToTimestamp = new Date(dateTo).getTime();

		filterData.forEach((data) => {
			var timestamp = new Date(data.timestamp).getTime();

			if (
				timestamp >= dateFromTimestamp &&
				timestamp <= dateToTimestamp
			) {
				draftData.push(data);
			}
		});
		setData(draftData);
	}, [date]);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>Analytics</CardTitle>
			</CardHeader>

			<CardContent className='space-y-2'>
				{rawdata.length > 0 && (
					<div>
						<DatePick />
						<AnalyticsCard data={data} />
					</div>
				)}

				<Table className='w-[700px]'>
					<TableHeader>
						<TableRow>
							<TableHead className='p-0 pl-2'>
								Date & Time
							</TableHead>
							<TableHead className='p-0'>Consumption</TableHead>
							<TableHead className='p-0'>Fueling </TableHead>
							<TableHead className='p-0'>Odometer</TableHead>
							<TableHead className='p-0'>Fuel Price</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{currentRecords.map((data, index) => (
							<TableRow
								key={index}
								onClick={(e) => handleDelete(data.id)}
							>
								<TableCell className='p-0 py-2 px-0'>
									<Badge
										variant='outline'
										className='border-none'
									>
										{new Date(
											data.timestamp
										).toLocaleDateString('en-MY')}
									</Badge>
									<br></br>
									<Badge
										variant='outline'
										className='border-none'
									>
										{new Date(
											data.timestamp
										).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</Badge>
								</TableCell>
								<TableCell className='p-0'>
									<Badge variant='destructive'>
										{data.trip != 0
											? data.consumption.toFixed(1) +
											  ' km/L'
											: '0 km/L'}
									</Badge>
									<br></br>
									<Badge variant='outline'>
										{data.trip != 0
											? data.trip +
											  'km : ' +
											  (
													data.trip / data.consumption
											  ).toFixed(2) +
											  'L'
											: '0 km'}
									</Badge>
								</TableCell>
								<TableCell className='p-0'>
									<Badge variant='outline'>
										{' '}
										RM{' '}
										{
											getFuelingTemplate(
												data.amount,
												data.price,
												data.ron
											).outputRM
										}
									</Badge>
									<br></br>
									<Badge
										variant='outline'
										style={{ border: 'none' }}
									>
										{' '}
										{
											getFuelingTemplate(
												data.amount,
												data.price,
												data.ron
											).outputL
										}{' '}
										L
									</Badge>
								</TableCell>
								<TableCell className='p-0'>
									<Badge>{data.odometer}</Badge>
								</TableCell>
								<TableCell className='p-0'>
									{getRonTemplate(data.ron, data.price)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className='flex flex-row-reverse gap-2'>
					{Array.from(
						{ length: Math.ceil(data.length / recordsPerPage) },
						(_, i) => Math.ceil(data.length / recordsPerPage) - i
					).map((pageNumber) => (
						<Button
							key={pageNumber}
							size='icon'
							onClick={() => paginate(pageNumber)}
						>
							{pageNumber}
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default DashboardEntry;
