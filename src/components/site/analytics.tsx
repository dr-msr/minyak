import * as React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LineChart, List, ListItem } from '@tremor/react';
import { useData } from "@/data/context";
import { Log, PriceData } from "@/data/version";
import { getPrice } from "@/lib/utils";



interface AnalyticsCardProps {
	data: Log[];
}
export const AnalyticsCard = (data : AnalyticsCardProps) => {


	function getLitreUsage( amount: { unit: string; value: number; }, price : PriceData, ron : string) {
		
		var currentPrice
		if (ron == 	"RON95") {
			 currentPrice = price.ron95
		} else {
			 currentPrice = price.ron97
		}
			
		if (amount.unit === "RM") {
			return amount.value / currentPrice
		} else {
			return amount.value
		}

	}

	function getPriceUsage( amount: { unit: string; value: number; }, price : PriceData, ron : string) {
		
		var currentPrice
		if (ron == 	"RON95") {
			 currentPrice = price.ron95
		} else {
			 currentPrice = price.ron97
		}
			
		if (amount.unit === "RM") {
			return amount.value
		} else {
			return amount.value * currentPrice
		}

	}

	function getAverageFuelConsumption() {
		
		if (data.data.length > 1) {
			const totalKm = data.data[data.data.length - 1].odometer - data.data[0].odometer
			const totalLitre = data.data.slice(1).map((data) => getLitreUsage(data.amount, data.price, data.ron)).reduce((a, b) => a + b, 0);
			return (totalKm / totalLitre).toFixed(2)
		
		} else {
			return "0.00"
		}
	}

	const chart_consumption = data.data.map((data) => ({ 
		'Consumption (km/L)': data.consumption.toFixed(2),
		'date': new Date(data.timestamp).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })
	}))

	const getTotalFuel = () => {
		var totalFuel = 0
		for (var i = 0; i < data.data.length; i++) {
			totalFuel += getLitreUsage(data.data[i].amount, data.data[i].price, data.data[i].ron)
		}
		return totalFuel.toFixed(2)
	}

	const getTotalCost = () => {
		var totalCost = 0
		for (var i = 0; i < data.data.length; i++) {
			totalCost += getPriceUsage(data.data[i].amount, data.data[i].price, data.data[i].ron)
		}
		return totalCost.toFixed(2)
	}

	const getDateRange = () => {
		if (data.data.length === 0) return ""
		return `${new Date(data.data[0].timestamp).toLocaleDateString('en-MY')} - ${new Date(data.data[data.data.length-1].timestamp).toLocaleDateString('en-MY')}`
	}

  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
      
          <CarouselItem key={0}>
            <div className="p-1">
              <Card className="flex flex-col justify-between items-center aspect-square">
				<CardHeader className="text-center">Average Fuel Consumption</CardHeader>
                <CardContent className="flex items-center aspect-square justify-center">
				<div className="flex flex-col">
					<h1 className="text-center text-5xl">{getAverageFuelConsumption()}</h1>
					<h1 className="text-center">km/litre</h1>
				</div>
                </CardContent>
				<CardFooter className="text-center"></CardFooter>
              </Card>
            </div>
          </CarouselItem>

		  <CarouselItem key={1}>
            <div className="p-1">
			<Card className="flex flex-col justify-between items-center aspect-square">
				<CardHeader className="text-center">Fuel Consumption Trend</CardHeader>
				<CardContent className="flex items-center justify-center p-2">
				
				<LineChart
        			className="w-full h-[250px] aspect-square"
        			data={chart_consumption.slice(1)}
					index="date"
					categories={['Consumption (km/L)']}
					colors={['blue']}
					yAxisWidth={20}
					showXAxis={true}
					showLegend={false}
					curveType="monotone"
				/>

                </CardContent>
				<CardFooter className="text-center"></CardFooter>

            </Card>
            </div>
          </CarouselItem>

		  <CarouselItem key={2}>
            <div className="p-1">
			<Card className="flex flex-col justify-between items-center aspect-square">
				<CardHeader className="text-center">Mileage Card</CardHeader>
				<CardContent className="flex items-center justify-center p-2">
			<div className="mx-auto max-w-md w-[300px]">
			<h3 className="mb-2 text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium text-center">{getDateRange()}</h3>
			
				<List>
					<ListItem>
					<span>Total Journey Made</span>
					<span>{(data.data.length > 0) && data.data[data.data.length-1].odometer - data.data[0].odometer } km</span>
					</ListItem>
					<ListItem>
					<span>Total Fuel Consumed</span>
					<span>{getTotalFuel()} Litre</span>
					</ListItem>
					<ListItem>
					<span>Total Money Spent</span>
					<span>RM {getTotalCost()}</span>
					</ListItem>
				</List>
			</div>

                </CardContent>
								<CardFooter className="text-center"></CardFooter>
            </Card>
            </div>
          </CarouselItem>

		  
    
      </CarouselContent>
      <CarouselPrevious style={{display:"none"}} />
      <CarouselNext style={{display:"none"}}  />
    </Carousel>
  )
}
