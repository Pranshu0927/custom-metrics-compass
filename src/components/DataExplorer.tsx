
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Database, Download, Filter, Search, Table } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Sample data for the explorer
const dataSources = [
  { id: "sales", name: "Sales Data", records: 12487, updated: "2025-04-15", connected: true },
  { id: "customers", name: "Customer Data", records: 8254, updated: "2025-04-14", connected: true },
  { id: "marketing", name: "Marketing Campaigns", records: 342, updated: "2025-04-10", connected: true },
  { id: "finance", name: "Financial Records", records: 5422, updated: "2025-04-12", connected: false },
];

// Sample table data
const tableData = [
  { id: 1, date: "2025-04-15", product: "Product A", quantity: 42, price: 29.99, total: 1259.58 },
  { id: 2, date: "2025-04-15", product: "Product B", quantity: 18, price: 49.99, total: 899.82 },
  { id: 3, date: "2025-04-14", product: "Product C", quantity: 36, price: 19.99, total: 719.64 },
  { id: 4, date: "2025-04-14", product: "Product A", quantity: 24, price: 29.99, total: 719.76 },
  { id: 5, date: "2025-04-13", product: "Product D", quantity: 10, price: 99.99, total: 999.90 },
  { id: 6, date: "2025-04-13", product: "Product B", quantity: 15, price: 49.99, total: 749.85 },
  { id: 7, date: "2025-04-12", product: "Product E", quantity: 28, price: 15.99, total: 447.72 },
  { id: 8, date: "2025-04-12", product: "Product A", quantity: 32, price: 29.99, total: 959.68 },
  { id: 9, date: "2025-04-11", product: "Product C", quantity: 22, price: 19.99, total: 439.78 },
  { id: 10, date: "2025-04-11", product: "Product D", quantity: 5, price: 99.99, total: 499.95 },
];

const DataExplorer = () => {
  const { toast } = useToast();
  const [selectedSource, setSelectedSource] = useState<string | null>("sales");
  const [searchText, setSearchText] = useState("");
  const [showTable, setShowTable] = useState(true);
  
  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
    setShowTable(true);
    toast({
      title: "Data Source Selected",
      description: `Connected to ${dataSources.find(src => src.id === sourceId)?.name}`,
    });
  };

  const handleConnectSource = () => {
    toast({
      title: "Connection Initiated",
      description: "Connecting to Financial Records data source...",
    });
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Financial Records data source is now available",
      });
    }, 2000);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Preparing data for export...",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Data has been exported successfully",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
            <CardDescription>
              Browse and select data sources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dataSources.map(source => (
              <div 
                key={source.id}
                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                  selectedSource === source.id 
                    ? 'bg-bi-blue-50 border-bi-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => source.connected && handleSourceSelect(source.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{source.name}</span>
                  {source.connected ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </span>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnectSource();
                      }}
                    >
                      Connect
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {source.records.toLocaleString()} records · Updated {source.updated}
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              <Database className="h-4 w-4 mr-2" />
              Add New Data Source
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {selectedSource 
                    ? dataSources.find(src => src.id === selectedSource)?.name 
                    : 'Data Explorer'}
                </CardTitle>
                <CardDescription>
                  {selectedSource 
                    ? `Showing ${dataSources.find(src => src.id === selectedSource)?.records.toLocaleString()} records`
                    : 'Select a data source to begin'}
                </CardDescription>
              </div>
              
              {selectedSource && (
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowTable(!showTable)}
                  >
                    {showTable ? "Hide" : "Show"} Table
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleExportData}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          
          {selectedSource && (
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    className="pl-8"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Records</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showTable && (
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="p-3 text-left font-medium">Date</th>
                          <th className="p-3 text-left font-medium">Product</th>
                          <th className="p-3 text-left font-medium">Quantity</th>
                          <th className="p-3 text-left font-medium">Price</th>
                          <th className="p-3 text-left font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData
                          .filter(row => searchText === "" || 
                            Object.values(row).some(val => 
                              val.toString().toLowerCase().includes(searchText.toLowerCase())
                            )
                          )
                          .map(row => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{row.date}</td>
                              <td className="p-3">{row.product}</td>
                              <td className="p-3">{row.quantity}</td>
                              <td className="p-3">${row.price.toFixed(2)}</td>
                              <td className="p-3">${row.total.toFixed(2)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <div>
                  Showing {tableData.filter(row => searchText === "" || 
                    Object.values(row).some(val => 
                      val.toString().toLowerCase().includes(searchText.toLowerCase())
                    )
                  ).length} of {tableData.length} records
                </div>
                <div className="flex items-center gap-2">
                  <span>Data quality:</span>
                  <Progress value={95} className="w-24 h-2" />
                  <span>95%</span>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DataExplorer;
