"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/api/api"

interface MovementData {
  date: string;
  item: string;
  quantity: number;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export const description = "An interactive area chart"

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([])
  const [loading, setLoading] = React.useState(true)
  const [items, setItems] = React.useState<string[]>([])
  const [chartConfig, setChartConfig] = React.useState<any>({})

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/stock')
        console.log(response.data)
        const products: any[] = response.data 
        const data: MovementData[] = [] 
        products.forEach(product => {
          product.moviments.forEach((mov: any) => {
            data.push({
              date: mov.created_at, 
              item: product.name,
              quantity: mov.quantity
            })
          })
        })
        const grouped: { [date: string]: { [item: string]: number } } = {}
        const itemSet = new Set<string>()
        data.forEach(item => {
          if (!grouped[item.date]) {
            grouped[item.date] = {}
          }
          if (!grouped[item.date][item.item]) {
            grouped[item.date][item.item] = 0
          }
          grouped[item.date][item.item] += item.quantity
          itemSet.add(item.item)
        })
        const processedData: ChartDataPoint[] = Object.keys(grouped).map(date => ({
          date,
          ...grouped[date]
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        const itemList = Array.from(itemSet)
        setChartData(processedData)
        setItems(itemList)
      
        const config: any = {}
        itemList.forEach((item, index) => {
          config[item] = {
            label: item,
            color: `var(--chart-${(index % 5) + 1})`,
          }
        })
        setChartConfig(config)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {items.map((item) => (
              <Area
                key={item}
                dataKey={item}
                type="natural"
                fill={chartConfig[item].color} // Use color from chartConfig
                stroke={chartConfig[item].color} // Use color from chartConfig
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
