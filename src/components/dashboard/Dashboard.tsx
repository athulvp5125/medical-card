
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Folder, Calendar, AlertTriangle } from "lucide-react";
import RecordsList from "./RecordsList";
import UploadRecord from "./UploadRecord";

const Dashboard: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const recordCounts = {
    vaccinations: 4,
    medications: 2,
    allergies: 1,
    conditions: 3,
    labResults: 5
  };

  const totalRecords = Object.values(recordCounts).reduce((a, b) => a + b, 0);
  
  const recentRecords = [
    { id: 1, title: "COVID-19 Vaccination", type: "vaccination", date: "2023-10-15", provider: "City Hospital" },
    { id: 2, title: "Annual Physical", type: "examination", date: "2023-09-20", provider: "Dr. Smith" },
    { id: 3, title: "Blood Test Results", type: "labResult", date: "2023-08-05", provider: "Medical Lab Inc." }
  ];
  
  const upcomingItems = [
    { id: 1, title: "Flu Shot", date: "2023-11-20", type: "vaccination" },
    { id: 2, title: "Prescription Refill", date: "2023-11-10", type: "medication" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Dashboard</h1>
        <Button onClick={() => setShowUploadModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Your health documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRecords}</div>
            <p className="text-muted-foreground mt-1">Total Records</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-sm">Vaccinations ({recordCounts.vaccinations})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                <span className="text-sm">Medications ({recordCounts.medications})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                <span className="text-sm">Allergies ({recordCounts.allergies})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Conditions ({recordCounts.conditions})</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Emergency Access</CardTitle>
            <CardDescription>Quick access for emergencies</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse-ring"></div>
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <Button variant="destructive" className="w-full" asChild>
              <a href="/emergency">Generate Emergency QR</a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>Scheduled events and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingItems.map((item) => (
                <li key={item.id} className="flex items-start space-x-3 p-2 bg-muted/50 rounded-md">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <time className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</time>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="labResults">Lab Results</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <RecordsList records={recentRecords} />
        </TabsContent>
        <TabsContent value="vaccinations" className="pt-4">
          <RecordsList 
            records={recentRecords.filter(r => r.type === 'vaccination')} 
          />
        </TabsContent>
        <TabsContent value="medications" className="pt-4">
          <div className="text-center py-8 text-muted-foreground">
            <Folder className="h-12 w-12 mx-auto mb-2 opacity-40" />
            <p>No medication records found</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowUploadModal(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Medication Record
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="labResults" className="pt-4">
          <RecordsList 
            records={recentRecords.filter(r => r.type === 'labResult')} 
          />
        </TabsContent>
      </Tabs>
      
      {showUploadModal && <UploadRecord onClose={() => setShowUploadModal(false)} />}
    </div>
  );
};

export default Dashboard;
