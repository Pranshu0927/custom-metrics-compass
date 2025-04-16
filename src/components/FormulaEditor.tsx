
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Plus, Save, Trash, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Formula {
  id: string;
  name: string;
  description: string;
  formula: string;
  result: string | number | null;
}

// Sample initial formulas
const initialFormulas: Formula[] = [
  {
    id: "1",
    name: "Revenue Growth",
    description: "Calculates revenue growth percentage between periods",
    formula: "(currentRevenue - previousRevenue) / previousRevenue * 100",
    result: "12.5%"
  },
  {
    id: "2",
    name: "Profit Margin",
    description: "Calculates profit margin as a percentage of revenue",
    formula: "(revenue - costs) / revenue * 100",
    result: "24.3%"
  }
];

const FormulaEditor = () => {
  const { toast } = useToast();
  const [formulas, setFormulas] = useState<Formula[]>(initialFormulas);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFormula, setCurrentFormula] = useState<Formula>({
    id: "",
    name: "",
    description: "",
    formula: "",
    result: null
  });

  const handleSelectFormula = (id: string) => {
    const formula = formulas.find(f => f.id === id);
    if (formula) {
      setCurrentFormula({ ...formula });
      setSelectedFormulaId(id);
      setIsEditing(false);
    }
  };

  const handleNewFormula = () => {
    const newFormula: Formula = {
      id: Date.now().toString(),
      name: "New Formula",
      description: "",
      formula: "",
      result: null
    };
    setCurrentFormula(newFormula);
    setSelectedFormulaId(null);
    setIsEditing(true);
  };

  const handleEditFormula = () => {
    setIsEditing(true);
  };

  const handleSaveFormula = () => {
    if (!currentFormula.name || !currentFormula.formula) {
      toast({
        title: "Error",
        description: "Formula name and expression are required",
        variant: "destructive"
      });
      return;
    }

    // In a real application, we would evaluate the formula here
    // For this demo, we'll just set a random result
    const formulaWithResult = {
      ...currentFormula,
      result: (Math.random() * 100).toFixed(1) + "%"
    };

    if (selectedFormulaId) {
      // Update existing formula
      setFormulas(formulas.map(f => 
        f.id === selectedFormulaId ? formulaWithResult : f
      ));
    } else {
      // Add new formula
      setFormulas([...formulas, formulaWithResult]);
    }

    setCurrentFormula(formulaWithResult);
    setSelectedFormulaId(formulaWithResult.id);
    setIsEditing(false);

    toast({
      title: "Success",
      description: "Formula saved successfully",
    });
  };

  const handleCancelEdit = () => {
    if (selectedFormulaId) {
      // Revert to original formula
      const originalFormula = formulas.find(f => f.id === selectedFormulaId);
      if (originalFormula) {
        setCurrentFormula({ ...originalFormula });
      }
    } else {
      // Clear new formula
      setCurrentFormula({
        id: "",
        name: "",
        description: "",
        formula: "",
        result: null
      });
    }
    
    setIsEditing(false);
  };

  const handleDeleteFormula = () => {
    if (selectedFormulaId) {
      setFormulas(formulas.filter(f => f.id !== selectedFormulaId));
      setSelectedFormulaId(null);
      setCurrentFormula({
        id: "",
        name: "",
        description: "",
        formula: "",
        result: null
      });
      toast({
        title: "Formula deleted",
        description: "The formula has been removed",
      });
    }
  };

  // Available fields for formula construction (would come from data source in real app)
  const availableFields = [
    { name: "revenue", type: "number", description: "Total revenue" },
    { name: "costs", type: "number", description: "Total costs" },
    { name: "currentRevenue", type: "number", description: "Current period revenue" },
    { name: "previousRevenue", type: "number", description: "Previous period revenue" },
    { name: "customers", type: "number", description: "Customer count" },
    { name: "newCustomers", type: "number", description: "New customer count" },
    { name: "marketingSpend", type: "number", description: "Marketing expenditure" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>My Formulas</CardTitle>
          <CardDescription>
            Create and manage custom metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleNewFormula}
          >
            <Plus className="h-4 w-4" />
            <span>Create New Formula</span>
          </Button>
          
          <div className="mt-4 space-y-2">
            {formulas.map(formula => (
              <div 
                key={formula.id}
                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                  selectedFormulaId === formula.id 
                    ? 'bg-bi-blue-50 border-bi-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => handleSelectFormula(formula.id)}
              >
                <div className="font-medium">{formula.name}</div>
                <div className="text-sm text-muted-foreground truncate">{formula.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {isEditing 
              ? (selectedFormulaId ? 'Edit Formula' : 'New Formula') 
              : (currentFormula.name || 'Formula Details')}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? 'Define your formula and description'
              : 'View and edit formula details'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(isEditing || currentFormula.id) ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Formula Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., Revenue Growth Rate" 
                  value={currentFormula.name}
                  onChange={(e) => setCurrentFormula({...currentFormula, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what this formula calculates" 
                  value={currentFormula.description}
                  onChange={(e) => setCurrentFormula({...currentFormula, description: e.target.value})}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="formula">Formula Expression</Label>
                <Textarea 
                  id="formula" 
                  placeholder="e.g., (currentRevenue - previousRevenue) / previousRevenue * 100" 
                  value={currentFormula.formula}
                  onChange={(e) => setCurrentFormula({...currentFormula, formula: e.target.value})}
                  disabled={!isEditing}
                  className="font-mono"
                  rows={3}
                />
                {isEditing && (
                  <div className="text-sm text-muted-foreground">
                    Use standard mathematical operators (+, -, *, /) and parentheses to create your formula.
                  </div>
                )}
              </div>
              
              {isEditing && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium mb-2">Available Fields</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {availableFields.map((field) => (
                        <div 
                          key={field.name}
                          className="text-sm p-2 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setCurrentFormula({
                              ...currentFormula, 
                              formula: currentFormula.formula + field.name
                            });
                          }}
                        >
                          <div className="font-medium">{field.name}</div>
                          <div className="text-xs text-muted-foreground">{field.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {!isEditing && currentFormula.result && (
                <div className="bg-bi-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-1">Result</h3>
                  <div className="text-2xl font-bold">{currentFormula.result}</div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              Select a formula or create a new one
            </div>
          )}
        </CardContent>
        
        {(isEditing || currentFormula.id) && (
          <CardFooter className="flex justify-between border-t p-4">
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveFormula}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Formula
                </Button>
              </>
            ) : (
              <>
                <Button variant="destructive" onClick={handleDeleteFormula}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={handleEditFormula}>
                  Edit Formula
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default FormulaEditor;
