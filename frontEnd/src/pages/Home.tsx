import { ChartAreaInteractive } from "@/components/feature/dashboard/AreaChart/components/AreaChartProducts";
import { ChartPieLabelList } from "@/components/feature/dashboard/pieChart/components/PieCharts";
import { ChartBarHorizontal } from "@/components/feature/dashboard/StockEvolutionChart/components/StockEvolutionChart";

export default function Home() {
  return (
    <>
      <div>
      <ChartAreaInteractive/>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <ChartPieLabelList/>
        </div>
        <div className="flex-[2]">
          <ChartBarHorizontal/>
        </div>
      </div>
    </>
    
  )
}