
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart3, Calculator, ChartPie, LayoutDashboard } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="py-6 px-8 flex items-center justify-between border-b bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-bi-blue-600" />
          <h1 className="text-2xl font-bold text-bi-blue-700">MetricsCompass</h1>
        </div>
        <Button onClick={() => navigate("/dashboard")}>Open Dashboard</Button>
      </header>
      
      <main className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Create Custom Metrics <span className="text-bi-blue-600">With Ease</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build powerful dashboards, calculate custom formulas, and visualize your data
            all in one place.
          </p>
          <Button 
            size="lg" 
            className="mt-8 bg-bi-blue-600 hover:bg-bi-blue-700"
            onClick={() => navigate("/dashboard")}
          >
            Get Started Now
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-bi-blue-50 p-3 rounded-full w-fit mb-4">
              <BarChart3 className="h-6 w-6 text-bi-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Dashboards</h3>
            <p className="text-gray-600">
              Create stunning dashboards with multiple visualizations to track and analyze your key metrics.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-bi-blue-50 p-3 rounded-full w-fit mb-4">
              <Calculator className="h-6 w-6 text-bi-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Formulas</h3>
            <p className="text-gray-600">
              Define and calculate custom metrics using a powerful formula editor with real-time updates.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-bi-blue-50 p-3 rounded-full w-fit mb-4">
              <ChartPie className="h-6 w-6 text-bi-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
            <p className="text-gray-600">
              Visualize your data with various chart types and customize them to your exact needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
