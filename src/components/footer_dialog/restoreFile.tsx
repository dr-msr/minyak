/**
 * RestoreFile displays a confirmation dialog for restoring a file from a savefile.
 * It takes a close callback to report whether the user confirmed restoring or canceled.
 * It contains a RestoreAlert component to handle the restore action.
 */

import { Button } from '../ui/button';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { AlertRestore } from '../site/alertRestore';

interface RestoreFileProps {
	close: (value: boolean) => void;
}

export const RestoreFile: React.FC<RestoreFileProps> = ({ close }) => {
	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Restore File</DialogTitle>
				<DialogDescription>
					Your current data will be replaced with the data from the
					savefile.{' '}
				</DialogDescription>
			</DialogHeader>

			<div className='grid gap-4 py-4'>
				<AlertRestore success={(value) => close(value)} />
			</div>

			<DialogFooter>
				<DialogClose asChild>
					<Button type='submit'>Cancel</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};
