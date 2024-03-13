/**
 * OpenSource component renders license, source code,
 * tech stack, and external API information in a dialog.
 * Contains nested components for each section.
 */


import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '../ui/card';
import GitHubButton from 'react-github-btn';

const License = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<p>
					<code>
						Minyak.Today is open source and available under the MIT
						License. You are free to use, copy, modify, merge,
						publish, distribute, sublicense, and/or sell copies of
						the software, provided that you give appropriate credit,
						provide a link to the license, and indicate if changes
						were made. You agree not to hold the original authors or
						copyright holders liable.
					</code>
				</p>
			</div>
		</Card>
	);
};

const Git = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<p>
					The source code is readily available in Github. Feel free to
					star and follow the project!
				</p>
			</div>
		</Card>
	);
};

const Stack = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<p>
					The following stack is used in developing and maintaining
					Minyak.Today :
				</p>
				<ol className='p-2'>
					<li>• Framework : Next.js</li>
					<li>• Javascript Library : React</li>
					<li>• Language : TypeScript</li>
					<li>• Analytics : Vercel Analytics & Umami</li>
					<li>• Hosting : Vercel</li>
					<li>• Domain Registrar : Namecheap</li>
					<li>• CDN/Security : Cloudflare</li>
				</ol>
			</div>
		</Card>
	);
};

const API = () => {
	return (
		<Card>
			<div className='p-2 text-left'>
				<p>The following external API is used :</p>
				<ol className='p-2'>
					<li>• Data.gov.my : Latest fuel price in Malaysia</li>
					<li>
						• Google Custom Search : Search result for latest news
						about minyak in Malaysia{' '}
					</li>
					<li>• Umami Cloud : Web analytics and visitor tracking</li>
					<li>
						• Vercel Analytics : Web analytics and visitor tracking
					</li>
				</ol>
			</div>
		</Card>
	);
};

export const OpenSource = () => {
	return (
		<DialogContent className='sm:max-w-[425px] max-h-[100vh] overflow-y-scroll'>
			<DialogHeader>
				<DialogTitle>Open Source</DialogTitle>
			</DialogHeader>

			<DialogDescription>
				<Accordion
					type='single'
					autoFocus
					collapsible
					className='w-full'
					defaultChecked={true}
					defaultValue='item-1'
				>
					<AccordionItem value='item-1'>
						<AccordionTrigger>License</AccordionTrigger>
						<AccordionContent>
							<License />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger>Source Code</AccordionTrigger>
						<AccordionContent>
							<Git />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-3'>
						<AccordionTrigger>Tech Stack</AccordionTrigger>
						<AccordionContent>
							<Stack />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-4'>
						<AccordionTrigger>External API</AccordionTrigger>
						<AccordionContent>
							<API />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</DialogDescription>

			<DialogFooter>
				<div className='flex flex-row justify-center items-center gap-2'>
					<div>
						<GitHubButton
							href='https://github.com/sponsors/dr-msr'
							data-color-scheme='no-preference: light; light: light; dark: light;'
							data-icon='octicon-heart'
							data-size='large'
							aria-label='Sponsor'
						>
							Sponsor
						</GitHubButton>
					</div>
					<div autoFocus={true}>
						<GitHubButton
							href='https://github.com/dr-msr/minyakToday'
							data-color-scheme='no-preference: light; light: light; dark: light;'
							data-size='large'
							data-show-count='true'
							aria-label='Star dr-msr/minyakToday on GitHub'
						>
							Star
						</GitHubButton>
					</div>
				</div>
			</DialogFooter>
		</DialogContent>
	);
};
