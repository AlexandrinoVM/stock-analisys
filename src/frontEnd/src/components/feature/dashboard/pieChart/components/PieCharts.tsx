"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import api from "@/api/api"
import { useRefresh } from "@/contexts/RefreshContext"

interface ProductData {
  name: string;
  totalQuantity: number;
}

export const description = "A pie chart with product quantities"

export function ChartPieLabelList() {
  const [chartData, setChartData] = React.useState<ProductData[]>([])
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({})
  const [loading, setLoading] = React.useState(true)
  const { refreshTrigger } = useRefresh()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/stock')
        const products: any[] = response.data
        const productTotals: { [name: string]: number } = {}

        products.forEach(product => {
          productTotals[product.name] = product.balance.quantity || 0
        })

        const processedData: ProductData[] = Object.keys(productTotals).map((name, index) => ({
          name,
          totalQuantity: productTotals[name],
        }))

        setChartData(processedData)

        const config: ChartConfig = {}
        processedData.forEach((item, index) => {
          config[item.name] = {
            label: item.name,
            color: `var(--chart-${(index % 5) + 1})`,
          }
        })
        console.log('config', config)
        setChartConfig(config)
        console.log('Fetched and processed data:', processedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshTrigger])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Product Quantities</CardTitle>
        <CardDescription>Total quantities from stock movements</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[315px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie data={chartData} dataKey="totalQuantity">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={9}
                formatter={(value: string) => value}
              />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total products tracked <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing aggregated quantities from all movements
        </div>
      </CardFooter>
    </Card>
  )
}
