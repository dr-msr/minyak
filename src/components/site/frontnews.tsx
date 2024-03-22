/**
 * FrontNews component fetches and displays news headlines.
 * - Fetches news data from API on mount.
 * - Displays news headlines in a list.
 * - Opens news link in new tab when headline is clicked.
 * - Shows loading state if data is not fetched yet.
 */

'use client';

import { List, ListItem } from '@tremor/react';
import { Card } from '../ui/card';
import { useQuery } from '@tanstack/react-query';
import { News, fetchNews } from '../../lib/news';

export async function getStaticProps() {
	const news = await fetchNews()
	return { props: { news } }
  }

const FrontNews = (props: { news: News[]; }) => {
//	const [news, SetNews] = useState<news[]>([]);

const { data : news } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    initialData: props.news,
  })

	if (news != undefined) return (
		<Card>
			{news.length > 0 ? (
				<div className='p-4'>
					<h1 className='text-xl font-bold'>News On Minyak</h1>
					<List className='p-2'>
						{news.map((item, index) => (
							<ListItem
								key={index}
								onClick={() => window.open(item.link, '_blank')}
								style={{ cursor: 'pointer' }}
								className='hover:bg-gray-100 p-2 rounded-md'
							>
								{item.title}
							</ListItem>
						))}
					</List>
				</div>
			) : (
				<div className='p-4'>
					<h1 className='text-xl font-bold'>
						Berita Minyak Hari Ini
					</h1>
					<p className='text-gray-500'>This is the front news</p>
					<List className='p-2'>
						<ListItem>{'>> '}Loading...</ListItem>
					</List>
				</div>
			)}
		</Card>
	);
};

export default FrontNews;
