/**
 * Renders a list of article posts.
 * Fetches articles from the CMS and displays them in a list.
 * Clicking on a link post opens it in a new tab.
 * Clicking on other posts opens a dialog with the full content.
 */

'use client';

import { List, ListItem } from '@tremor/react';
import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ExternalLink } from 'lucide-react';
import { getArticles, iterateArticles } from '@/articles/util';

export type Post = {
	id: string;
	title: string;
	type: string;
	content: string;
	url: string;
	author: string;
};

const FrontPost = () => {
	const [active, setActive] = useState<Post | null>(null);
	const [open, setOpen] = useState(false);
	const [posts, SetPosts] = useState<Post[]>([]);
	const [serveroutput, setServeroutput] = useState(["Test", "Test2", "Test3"])

	function generateBadge(type: string) {
		switch (type) {
			case 'Link':
				return (
					<Badge variant='outline' className='mr-2'>
						{type} <ExternalLink size='10' className='ml-1' />
					</Badge>
				);
			case 'Admin':
				return (
					<Badge variant='destructive' className='mr-2'>
						{type}
					</Badge>
				);
			default:
				return (
					<Badge variant='default' className='mr-2'>
						{type}
					</Badge>
				);
		}
	}

	const fetchPost = async () => {
		const post = await getArticles();
		console.log(post)
		const draftList: Post[] = [];
		if (post) {
			post.props.posts.forEach((item) => {
				const post: Post = {
					id: item.filename,
					title: item.data.title,
					type: item.data.type,
					content: item.content,
					url: item.data.author?.link,
					author: item.data.author?.name,
				};
				draftList.push(post);
			});
			draftList.reverse();
			SetPosts(draftList);
		}
	};

	const probeServer = async () => {
		const result = await iterateArticles();
		setServeroutput(result);

	
	}

	useEffect(() => {
		fetchPost();
		probeServer();
	}, []);

	return (
		<Card>
			{posts.length > 0 ? (
				<div className='p-4'>
					<h1 className='text-xl font-bold'>Articles</h1>
					<List className='max-h-[400px] overflow-y-auto mt-2'>
						{posts.map((post, index) => (
							<ListItem
								key={index}
								onClick={() => {
									if (post.type === 'Link') {
										window.open(post.url, '_blank');
										return;
									}
									setActive(post);
									setOpen(true);
								}}
								style={{ cursor: 'pointer' }}
								className='justify-between hover:bg-gray-100 p-2 rounded-md'
							>
								{post.title} {generateBadge(post.type)}
							</ListItem>
						))}
					</List>

					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent className='p-5'>
							<DialogHeader>
								<div className='text-left'>
									<DialogTitle>{active?.title}</DialogTitle>
									{active?.author}
								</div>
							</DialogHeader>

							<DialogDescription>
								<ReactMarkdown
									className='max-h-[70vh] overflow-y-scroll whitespace-pre-wrap text-left'
									components={{
										ul: ({ node, ...props }) => (
											<ul
												style={{ lineHeight: 1 }}
												{...props}
											/>
										),
										li: ({ node, ...props }) => (
											<li
												style={{
													display: 'flex',
													marginLeft: '1rem',
												}}
												{...props}
											>
												{' '}
												• {props.children}{' '}
											</li>
										),
									}}
								>
									{active?.content}
								</ReactMarkdown>
							</DialogDescription>

							<DialogFooter>
								<div className='flex flex-row justify-center gap-2'>
									{ active?.url &&  <Button
										variant='outline'
										onClick={() =>
											window.open(active?.url, '_blank')
										}
									>
										{active?.type == 'Admin'
											? 'Open'
											: 'Source'}
									</Button> }
									<Button
										variant='outline'
										onClick={() => setOpen(false)}
									>
										Close
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			) : (
				<div className='p-4'>
					<h1 className='text-xl font-bold'>Articles</h1>
					<List className='p-2'>
						<ListItem>{'>> '}Loading...</ListItem>
					</List>
				</div>
			)}
			{ serveroutput.map((item, index) => (
				<div key={index}>{item}</div>
			))}
			
		</Card>
	);
};

export default FrontPost;
