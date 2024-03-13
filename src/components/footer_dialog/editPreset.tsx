/**
 * Dialog component for editing preset values.
 *
 * Uses the data context to get and update the setting values.
 * Renders input fields for each preset value.
 * Calls context.updateSetting on save with new preset values.
 */

'use client';

import { Button } from '@/components/ui/button';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useData } from '@/data/context';

export const EditPreset = () => {
	const context = useData();
	const setting = context.data.Setting;
	const [preset1, setPreset1] = useState(setting.preset[1]);
	const [preset2, setPreset2] = useState(setting.preset[2]);
	const [preset3, setPreset3] = useState(setting.preset[3]);
	const [preset4, setPreset4] = useState(setting.preset[4]);

	function handleSave() {
		const newSetting = {
			...setting,
			preset: {
				1: preset1,
				2: preset2,
				3: preset3,
				4: preset4,
			},
		};
		context.updateSetting(newSetting);
	}

	useEffect(() => {
		setPreset1(setting.preset[1]);
		setPreset2(setting.preset[2]);
		setPreset3(setting.preset[3]);
		setPreset4(setting.preset[4]);
	}, [setting]);

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Edit Preset</DialogTitle>
				<DialogDescription>
					Make changes to your preset here. Click save when you are
					done.
				</DialogDescription>
			</DialogHeader>

			<div className='grid gap-4 py-4'>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='Preset 1' className='text-right'>
						Preset 1
					</Label>
					<Input
						id='1'
						type='number'
						value={preset1}
						onChange={(e) => setPreset1(Number(e.target.value))}
						className='col-span-3'
					/>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='Preset 2' className='text-right'>
						Preset 2
					</Label>
					<Input
						id='2'
						value={preset2}
						onChange={(e) => setPreset2(Number(e.target.value))}
						className='col-span-3'
					/>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='Preset 3' className='text-right'>
						Preset 3
					</Label>
					<Input
						id='2'
						value={preset3}
						onChange={(e) => setPreset3(Number(e.target.value))}
						className='col-span-3'
					/>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='Preset 2' className='text-right'>
						Preset 4
					</Label>
					<Input
						id='2'
						value={preset4}
						onChange={(e) => setPreset4(Number(e.target.value))}
						className='col-span-3'
					/>
				</div>
			</div>

			<DialogFooter>
				<DialogClose asChild>
					<Button type='submit' onClick={() => handleSave()}>
						Save changes
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};
