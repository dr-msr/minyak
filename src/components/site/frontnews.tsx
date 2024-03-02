'use client'

import { List, ListItem } from "@tremor/react"
import { Card } from "../ui/card"
import { getNews, news } from "@/lib/news"
import { useEffect, useState } from "react"



const FrontNews = () => {
	const [news, SetNews] = useState<news[]>([])

	const fetchNews = async () => {
		const news = await getNews();
		if (news) {
			SetNews(news)
		}
	}

	useEffect(() => {
    	fetchNews()
	},[])

	return (
		
		<Card>

			{ (news.length > 0) ? (
				<div className="p-4">
				<h1 className="text-xl font-bold">News On Minyak, Today</h1>
				<List className="p-2">
					
					{ news.map((item, index) => (
						<ListItem 
							key={index}
							onClick={() => window.open(item.link, "_blank")}
							style={{cursor: "pointer"}}
							className="hover:bg-gray-100 p-2 rounded-md"
						
						>{item.title}</ListItem>
					)) }


				</List>
			</div>

			) : (
				<div className="p-4">
				<h1 className="text-xl font-bold">Berita Minyak Hari Ini</h1>
				<p className="text-gray-500">This is the front news</p>
				<List className="p-2">
					
					<ListItem>{">> "}Loading...</ListItem>
				</List>
			</div>
			) }
			
			
		</Card>
		
	)
}

export default FrontNews