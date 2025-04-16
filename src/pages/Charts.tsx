
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChartEditor from "@/components/ChartEditor";

const Charts = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-3">
            <h1 className="text-2xl font-bold text-gray-900">Charts</h1>
          </header>
          
          <main className="flex-1 p-6 bg-gray-50">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chart Editor</CardTitle>
                  <CardDescription>
                    Create and customize visualizations from your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartEditor />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Charts;
