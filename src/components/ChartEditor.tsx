
import { useState } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  ChartBarIcon, ChartLineIcon, PieChartIcon, ArrowUpDown, 
  Save, Download, Settings, Edit, Palette, PlusCircle 
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data
const initialData = [
  { name: 'Jan', sales: 4000, profit: 2400, customers: 240 },
  { name: 'Feb', sales: 3000, profit: 1398, customers: 210 },
  { name: 'Mar', sales: 2000, profit: 9800, customers: 290 },
  { name: 'Apr', sales: 2780, profit: 3908, customers: 200 },
  { name: 'May', sales: 1890, profit: 4800, customers: 218 },
  { name: 'Jun', sales: 2390, profit: 3800, customers: 250 },
  { name: 'Jul', sales: 3490, profit: 4300, customers: 210 },
];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#A4DE6C', '#D0ED57', '#83a6ed', '#8dd1e1'
];

const dataMetrics = [
  { id: 'sales', name: 'Sales', unit: '$' },
  { id: 'profit', name: 'Profit', unit: '$' },
  { id: 'customers', name: 'Customers', unit: '' },
];

const chartTypes = [
  { id: 'bar', name: 'Bar Chart', icon: ChartBarIcon },
  { id: 'line', name: 'Line Chart', icon: ChartLineIcon },
  { id: 'area', name: 'Area Chart', icon: ChartLineIcon },
  { id: 'pie', name: 'Pie Chart', icon: PieChartIcon },
];

const chartSavedState = [
  { 
    id: '1',
    name: 'Monthly Sales',
    type: 'bar',
    xAxis: 'name',
    metrics: ['sales'],
    title: 'Monthly Sales Performance',
    showLegend: true
  },
  { 
    id: '2',
    name: 'Sales vs Profit',
    type: 'line',
    xAxis: 'name',
    metrics: ['sales', 'profit'],
    title: 'Sales vs Profit Comparison',
    showLegend: true
  },
  { 
    id: '3',
    name: 'Customer Distribution',
    type: 'pie',
    metrics: ['customers'],
    title: 'Customer Distribution by Month',
    showLegend: true
  }
];

const ChartEditor = () => {
  const { toast } = useToast();
  const [chartType, setChartType] = useState('bar');
  const [chartTitle, setChartTitle] = useState('My Chart');
  const [xAxisField, setXAxisField] = useState('name');
  const [selectedMetrics, setSelectedMetrics] = useState(['sales']);
  const [showLegend, setShowLegend] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [savedCharts, setSavedCharts] = useState(chartSavedState);
  const [currentChartId, setCurrentChartId] = useState<string | null>(null);
  
  const getDataKeys = () => {
    if (!initialData.length) return [];
    return Object.keys(initialData[0]).filter(key => key !== 'name');
  };
  
  const handleSelectMetric = (metric: string) => {
    if (chartType === 'pie') {
      // For pie chart, only allow one metric
      setSelectedMetrics([metric]);
    } else {
      // For other charts, toggle the metric selection
      if (selectedMetrics.includes(metric)) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
      } else {
        setSelectedMetrics([...selectedMetrics, metric]);
      }
    }
  };
  
  const handleSaveChart = () => {
    const chart = {
      id: currentChartId || Date.now().toString(),
      name: chartTitle,
      type: chartType,
      xAxis: xAxisField,
      metrics: selectedMetrics,
      title: chartTitle,
      showLegend,
    };
    
    if (currentChartId) {
      // Update existing chart
      setSavedCharts(savedCharts.map(c => c.id === currentChartId ? chart : c));
    } else {
      // Add new chart
      setSavedCharts([...savedCharts, chart]);
    }
    
    setCurrentChartId(chart.id);
    
    toast({
      title: "Chart Saved",
      description: `Your chart "${chartTitle}" has been saved successfully.`,
    });
  };
  
  const handleLoadChart = (chartId: string) => {
    const chart = savedCharts.find(c => c.id === chartId);
    if (chart) {
      setChartType(chart.type);
      setChartTitle(chart.title);
      setXAxisField(chart.xAxis || 'name');
      setSelectedMetrics(chart.metrics);
      setShowLegend(chart.showLegend);
      setCurrentChartId(chart.id);
      
      toast({
        title: "Chart Loaded",
        description: `"${chart.name}" has been loaded for editing.`,
      });
    }
  };
  
  const handleExportChart = () => {
    toast({
      title: "Chart Exported",
      description: "Your chart has been exported successfully.",
    });
  };
  
  const handleCreateNewChart = () => {
    setChartType('bar');
    setChartTitle('New Chart');
    setXAxisField('name');
    setSelectedMetrics(['sales']);
    setShowLegend(true);
    setShowGrid(true);
    setCurrentChartId(null);
    
    toast({
      title: "New Chart",
      description: "Create your new chart with the editor.",
    });
  };
  
  const renderChart = () => {
    if (selectedMetrics.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
          <Settings className="h-12 w-12 mb-2" />
          <p>Select at least one metric to display</p>
        </div>
      );
    }
    
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={initialData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisField} />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              {selectedMetrics.map((metric, index) => (
                <Bar 
                  key={metric} 
                  dataKey={metric} 
                  fill={COLORS[index % COLORS.length]} 
                  name={dataMetrics.find(m => m.id === metric)?.name || metric} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={initialData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisField} />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              {selectedMetrics.map((metric, index) => (
                <Line 
                  key={metric} 
                  type="monotone" 
                  dataKey={metric} 
                  stroke={COLORS[index % COLORS.length]} 
                  name={dataMetrics.find(m => m.id === metric)?.name || metric} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={initialData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisField} />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              {selectedMetrics.map((metric, index) => (
                <Area 
                  key={metric} 
                  type="monotone" 
                  dataKey={metric} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke={COLORS[index % COLORS.length]}
                  fillOpacity={0.3}
                  name={dataMetrics.find(m => m.id === metric)?.name || metric} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        // For pie chart, we only use the first selected metric
        const metric = selectedMetrics[0];
        const pieData = initialData.map(item => ({
          name: item.name,
          value: item[metric as keyof typeof item] as number,
        }));
        
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {showLegend && <Legend />}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Saved charts */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Charts</CardTitle>
              <CardDescription>Load or create charts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleCreateNewChart}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Chart</span>
              </Button>
              
              <div className="space-y-2">
                {savedCharts.map((chart) => (
                  <div 
                    key={chart.id}
                    onClick={() => handleLoadChart(chart.id)}
                    className={`p-3 rounded-md cursor-pointer border transition-colors ${
                      currentChartId === chart.id 
                        ? 'bg-bi-blue-50 border-bi-blue-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {chart.type === 'bar' && <ChartBarIcon className="h-4 w-4 mr-2" />}
                      {chart.type === 'line' && <ChartLineIcon className="h-4 w-4 mr-2" />}
                      {chart.type === 'pie' && <PieChartIcon className="h-4 w-4 mr-2" />}
                      <span className="font-medium">{chart.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chart.metrics.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right content area - Chart and editor */}
        <div className="w-full md:w-3/4">
          <Tabs defaultValue={editorMode} onValueChange={(v) => setEditorMode(v as 'edit' | 'preview')}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="edit" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <ChartBarIcon className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveChart}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportChart}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            {/* Chart display area */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderChart()}
              </CardContent>
            </Card>
            
            <TabsContent value="edit">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chart Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chart Type</CardTitle>
                    <CardDescription>Select the type of visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {chartTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={chartType === type.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setChartType(type.id)}
                        >
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Chart Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chart Settings</CardTitle>
                    <CardDescription>Customize your chart</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="chartTitle">Chart Title</Label>
                      <Input
                        id="chartTitle"
                        value={chartTitle}
                        onChange={(e) => setChartTitle(e.target.value)}
                        placeholder="Enter chart title"
                      />
                    </div>
                    
                    {chartType !== 'pie' && (
                      <div className="space-y-2">
                        <Label htmlFor="xAxis">X-Axis Field</Label>
                        <Select value={xAxisField} onValueChange={setXAxisField}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLegend">Show Legend</Label>
                      <Switch
                        id="showLegend"
                        checked={showLegend}
                        onCheckedChange={setShowLegend}
                      />
                    </div>
                    
                    {chartType !== 'pie' && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showGrid">Show Grid</Label>
                        <Switch
                          id="showGrid"
                          checked={showGrid}
                          onCheckedChange={setShowGrid}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Data Selection */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Data Selection</CardTitle>
                    <CardDescription>Choose the data to display</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Label>Select Metrics</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {dataMetrics.map((metric) => (
                          <div
                            key={metric.id}
                            className={`p-3 rounded-md cursor-pointer border transition-colors ${
                              selectedMetrics.includes(metric.id)
                                ? 'bg-bi-blue-50 border-bi-blue-200'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => handleSelectMetric(metric.id)}
                          >
                            <div className="font-medium">{metric.name}</div>
                            <div className="text-xs text-muted-foreground">Field: {metric.id}</div>
                          </div>
                        ))}
                      </div>
                      
                      {chartType === 'pie' && selectedMetrics.length > 1 && (
                        <div className="text-sm text-amber-600">
                          Note: Pie charts can only display one metric at a time. Only the first selected metric will be used.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Chart Preview</CardTitle>
                  <CardDescription>Final visualization preview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">{chartTitle}</h2>
                  </div>
                  {renderChart()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChartEditor;
