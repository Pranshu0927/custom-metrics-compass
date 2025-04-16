
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardOverview from "@/components/DashboardOverview";
import FormulaEditor from "@/components/FormulaEditor";
import DataExplorer from "@/components/DataExplorer";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to MetricsCompass",
      description: "Your dashboard is ready. Explore your data and create custom metrics.",
    });
  }, [toast]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-3">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </header>
          
          <main className="flex-1 p-6 bg-gray-50">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="formulas">Formulas</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <DashboardOverview />
              </TabsContent>
              
              <TabsContent value="formulas">
                <FormulaEditor />
              </TabsContent>
              
              <TabsContent value="data">
                <DataExplorer />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
