"use client"

import { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from "@/api/api"
import { useRefresh } from "@/contexts/RefreshContext"

export const description = "A table for today's product entries and exits"

interface ProductMovement {
  product: string;
  entries: number;
  exits: number;
}

export function ChartBarHorizontal() {
  const [chartData, setChartData] = useState<ProductMovement[]>([])
  const { refreshTrigger } = useRefresh()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, movementsRes] = await Promise.all([
          api.get('/products'),
          api.get('/stock-moviments')
        ])
        const products = productsRes.data
        const movements = movementsRes.data
        console.log('Products:', products)
        console.log('Movements:', movements)
        const today = new Date().toISOString().split('T')[0]
        const todaysMovements = movements.filter((m: { created_at: string }) => m.created_at.split('T')[0] === today)
        const productMap: Record<string | number, any> = {}
        products.forEach((p: { id: string | number; name: any }) => productMap[p.id] = p.name)
        const dataMap: Record<string, { entries: number; exits: number }> = {}
        todaysMovements.forEach((m: { product_id: string | number; type: string; quantity: any }) => {
          const prod = productMap[m.product_id]
          if (!prod) return
          if (!dataMap[prod]) dataMap[prod] = { entries: 0, exits: 0 }
          if (m.type === 'in') dataMap[prod].entries += m.quantity
          else if (m.type === 'out') dataMap[prod].exits += m.quantity
        })
        const data = Object.keys(dataMap).map(prod => ({ product: prod, ...dataMap[prod] }))
        setChartData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [refreshTrigger])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ins and Outs of Products</CardTitle>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Entries and exits of products today</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Entries</TableHead>
              <TableHead>Exits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((item) => (
              <TableRow key={item.product}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.entries}</TableCell>
                <TableCell>{item.exits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
