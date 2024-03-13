/**
 * Support dialog component.
 *
 * Allows user to submit an issue report and optionally
 * attach their data. Uses WhatsApp or Email
 * based on user selection.
 */

import { TextInput, Textarea } from '@tremor/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { useData } from '@/data/context';
import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { toast } from 'sonner';

export const Support = () => {
	const context = useData();
	const [issue, setIssue] = useState('');
	const [isData, setIsData] = useState<CheckedState>(false);
	const [method, setMethod] = useState('Whatsapp');

	function handleSubmit() {
		const payload = {
			issue: issue,
			data: isData,
			method: method,
		};

		var data;
		if (payload.data) {
			data = JSON.stringify(context.data);
		} else {
			data = 'No data submitted.';
		}

		const userAgent = navigator.userAgent;

		if (payload.method == 'Whatsapp') {
			const output =
				'[ minyak.today ]' +
				'\n\n*UID :*\n\n' +
				context.data.UUID +
				'\n\n*USER-AGENT :*\n\n' +
				userAgent +
				'\n\n*ISSUE :* \n\n' +
				payload.issue +
				'\n\n*DATA :* \n\n' +
				data;
			const link = encodeURI(
				'https://api.whatsapp.com/send?phone=' +
					process.env.NEXT_PUBLIC_DEVP +
					'&text=' +
					output
			);
			window.open(link, '_blank');
		} else {
			const output =
				'[ minyak.today ] : ' +
				new Date().toLocaleDateString() +
				' ' +
				new Date().toLocaleTimeString() +
				'\n\nUID :\n\n' +
				context.data.UUID +
				'\n\nUSER-AGENT :\n\n' +
				userAgent +
				'\n\nISSUE : \n\n' +
				payload.issue +
				'\n\nDATA : \n\n' +
				data;
			window.open(
				'mailto:' +
					process.env.NEXT_PUBLIC_DEVM +
					'?subject=[ Minyak.Today ] Support Request : ' +
					context.data.UUID +
					'&body=' +
					encodeURI(output),
				'_blank'
			);
		}

		toast.success(
			'Support ticket submitted. We will get back to you soon.'
		);
	}

	return (
		<DialogContent className='sm:max-w-[425px] max-h-[70vh] overflow-y-auto'>
			<DialogHeader>
				<DialogTitle>Support & Help</DialogTitle>
			</DialogHeader>

			<DialogDescription className='text-left'>
				<div className='flex flex-col gap-2 mt-4'>
					<Card>
						<Textarea
							value={issue}
							onValueChange={setIssue}
							placeholder='Describe your issue here.'
						></Textarea>
					</Card>

					<Card className='p-2'>
						<div className='flex items-center space-x-2'>
							<Checkbox
								id='dataAttached'
								checked={isData}
								onCheckedChange={setIsData}
							/>
							<label
								htmlFor='terms'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Attach your data together with your report.
							</label>
						</div>
					</Card>

					<Card className='p-2'>
						<RadioGroup
							defaultValue='Whatsapp'
							value={method}
							onValueChange={setMethod}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='Whatsapp'
									id='Whatsapp'
								/>
								<Label htmlFor='Whatsapp'>Whatsapp</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem value='Email' id='Email' />
								<Label htmlFor='option-two'>Email</Label>
							</div>
						</RadioGroup>
					</Card>
				</div>
			</DialogDescription>

			<DialogFooter className='gap-2'>
				<DialogClose asChild>
					<Button variant='ghost'>Close</Button>
				</DialogClose>

				<DialogClose asChild>
					<Button className='' onClick={handleSubmit}>
						Send
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};
