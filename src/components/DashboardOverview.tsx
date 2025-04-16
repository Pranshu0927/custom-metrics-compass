
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart2, TrendingUp, Users, DollarSign, Activity, FileSpreadsheet, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data for charts
const data = [
  { name: 'Jan', sales: 4000, profit: 2400, customers: 240 },
  { name: 'Feb', sales: 3000, profit: 1398, customers: 210 },
  { name: 'Mar', sales: 2000, profit: 9800, customers: 290 },
  { name: 'Apr', sales: 2780, profit: 3908, customers: 200 },
  { name: 'May', sales: 1890, profit: 4800, customers: 218 },
  { name: 'Jun', sales: 2390, profit: 3800, customers: 250 },
];

const DashboardOverview = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Your dashboard data is being prepared for export.",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported to Excel.",
      });
    }, 1500);
  };
  
  const handleEmailSetup = () => {
    toast({
      title: "Email Alert Configuration",
      description: "Set up automated email alerts for your team.",
    });
  };
  
  const navigateToCharts = () => {
    navigate("/charts");
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <h3 className="text-2xl font-bold mt-1">$24,380</h3>
                <p className="text-xs text-green-600 mt-1">+8.2% from last month</p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <h3 className="text-2xl font-bold mt-1">24.3%</h3>
                <p className="text-xs text-red-600 mt-1">-2.1% from last month</p>
              </div>
              <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <h3 className="text-2xl font-bold mt-1">1,429</h3>
                <p className="text-xs text-green-600 mt-1">+12.4% from last month</p>
              </div>
              <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                <h3 className="text-2xl font-bold mt-1">18.6%</h3>
                <p className="text-xs text-green-600 mt-1">+4.5% from last month</p>
              </div>
              <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={navigateToCharts}>
              Edit Chart
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Sales" fill="#8884d8" />
                <Bar dataKey="profit" name="Profit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>Monthly customer trends</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={navigateToCharts}>
              Edit Chart
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="customers" name="Customers" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="font-medium">Create Charts</h3>
              <p className="text-sm text-muted-foreground">Design custom visualizations from your data</p>
              <Button className="w-full" onClick={navigateToCharts}>
                Create Charts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-medium">Export Data</h3>
              <p className="text-sm text-muted-foreground">Download your dashboard data to Excel</p>
              <Button className="w-full" variant="outline" onClick={handleExport}>
                Export to Excel <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-medium">Email Alerts</h3>
              <p className="text-sm text-muted-foreground">Set up automated email reports</p>
              <Button className="w-full" variant="outline" onClick={handleEmailSetup}>
                Configure Alerts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
