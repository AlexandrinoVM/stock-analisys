import { ChartAreaInteractive } from "@/components/feature/dashboard/components/AreaChartProducts";



export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Welcome to Stock Management System</h1>
      <p className="mt-4 text-lg text-center">
        This is the home page. Use the navigation bar to explore different sections of the application.
      </p>
      <br />
      <ChartAreaInteractive/>
    </div>
  )
}