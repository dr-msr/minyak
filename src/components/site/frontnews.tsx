import { List, ListItem } from "@tremor/react"
import { Card } from "../ui/card"

const FrontNews = () => {
	return (
		<Card>
			<div className="p-4">
				<h1 className="text-xl font-bold">Berita Minyak Hari Ini</h1>
				<p className="text-gray-500">This is the front news</p>
				<List className="mt-2 p-2">
					
					<ListItem>{">> "}Item 1</ListItem>
					<ListItem>{">> "}Item 2</ListItem>
					<ListItem>{">> "}Item 3</ListItem>
				</List>
			</div>
			
		</Card>
		
	)
}

export default FrontNews