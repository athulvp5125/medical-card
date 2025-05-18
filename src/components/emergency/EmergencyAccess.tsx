
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Lock, Unlock, RefreshCcw, Clock, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmergencyAccess: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [pin, setPin] = useState("");
  const [accessDuration, setAccessDuration] = useState("30m");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAllergies, setShowAllergies] = useState(true);
  const [showMedications, setShowMedications] = useState(true);
  const [showConditions, setShowConditions] = useState(true);
  const [showVaccinations, setShowVaccinations] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random QR code URL for demonstration
    setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=healthpassport:emergency-access-demo");
    
    // Generate a random 6-digit PIN for demonstration
    setPin(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  const handleGenerateNewCode = async () => {
    setIsGenerating(true);
    
    try {
      // This is a mock generation - would be replaced with actual code generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a new QR code with a timestamp to force refresh
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=healthpassport:emergency-access-${Date.now()}`);
      
      // Generate a new PIN
      setPin(Math.floor(100000 + Math.random() * 900000).toString());
      
      toast({
        title: "Emergency access updated",
        description: "New QR code and PIN have been generated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "An error occurred while creating emergency access",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDurationText = () => {
    switch (accessDuration) {
      case "15m": return "15 minutes";
      case "30m": return "30 minutes";
      case "1h": return "1 hour";
      case "4h": return "4 hours";
      case "24h": return "24 hours";
      default: return "30 minutes";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Emergency Access</h1>
        <p className="text-muted-foreground">
          Generate temporary access to vital medical information for emergency responders
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Emergency Access Code</CardTitle>
            <CardDescription>
              This QR code provides temporary access to your critical medical information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <div className="relative">
                  {qrCodeUrl && <img src={qrCodeUrl} alt="Emergency QR Code" className="w-48 h-48" />}
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-medium">Emergency PIN</p>
                  <p className="text-2xl tracking-wider font-mono mt-1">{pin}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Access Duration</p>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Will expire after {getDurationText()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 py-2">
                  <p className="font-medium mb-1">Select Duration</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={accessDuration === "15m" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAccessDuration("15m")}
                    >
                      15 min
                    </Button>
                    <Button 
                      variant={accessDuration === "30m" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAccessDuration("30m")}
                    >
                      30 min
                    </Button>
                    <Button 
                      variant={accessDuration === "1h" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAccessDuration("1h")}
                    >
                      1 hour
                    </Button>
                    <Button 
                      variant={accessDuration === "4h" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAccessDuration("4h")}
                    >
                      4 hours
                    </Button>
                    <Button 
                      variant={accessDuration === "24h" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setAccessDuration("24h")}
                    >
                      24 hours
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 py-2">
                  <p className="font-medium">Emergency Instructions</p>
                  <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                    <li>Show this QR code to emergency responders</li>
                    <li>They can scan it to access your critical medical information</li>
                    <li>Alternatively, provide the PIN code if QR scanning is not possible</li>
                    <li>Access will automatically expire after the selected duration</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.print()}>
              Print QR Code
            </Button>
            <Button onClick={handleGenerateNewCode} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> Regenerating...
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Generate New Code
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Information Access Control</CardTitle>
            <CardDescription>
              Manage what information is visible during emergency access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allergies">Allergies</Label>
                <p className="text-sm text-muted-foreground">Medication and food allergies</p>
              </div>
              <Switch
                id="allergies"
                checked={showAllergies}
                onCheckedChange={setShowAllergies}
              />
            </div>
            
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="medications">Current Medications</Label>
                <p className="text-sm text-muted-foreground">Prescriptions and supplements</p>
              </div>
              <Switch
                id="medications"
                checked={showMedications}
                onCheckedChange={setShowMedications}
              />
            </div>
            
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="conditions">Medical Conditions</Label>
                <p className="text-sm text-muted-foreground">Chronic and acute conditions</p>
              </div>
              <Switch
                id="conditions"
                checked={showConditions}
                onCheckedChange={setShowConditions}
              />
            </div>
            
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vaccinations">Vaccination History</Label>
                <p className="text-sm text-muted-foreground">Immunization records</p>
              </div>
              <Switch
                id="vaccinations"
                checked={showVaccinations}
                onCheckedChange={setShowVaccinations}
              />
            </div>
            
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contacts">Emergency Contacts</Label>
                <p className="text-sm text-muted-foreground">Family and physician contacts</p>
              </div>
              <Switch
                id="contacts"
                checked={showContacts}
                onCheckedChange={setShowContacts}
              />
            </div>
            
            <div className="pt-2">
              <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-md flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Important</p>
                  <p>Vital, life-saving information like blood type and severe allergies will always be visible in emergency mode.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Access History</CardTitle>
          <CardDescription>
            Review who has accessed your medical information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="emergency">
            <TabsList>
              <TabsTrigger value="emergency">Emergency Access</TabsTrigger>
              <TabsTrigger value="shared">Shared Access</TabsTrigger>
              <TabsTrigger value="all">All Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="emergency" className="pt-4">
              <div className="divide-y">
                <div className="py-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Unlock className="h-4 w-4 text-yellow-600" />
                      <p className="font-medium">Emergency Access</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      QR code scanned at City Hospital ER
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">May 15, 2023</p>
                    <p className="text-xs text-muted-foreground">10:42 AM</p>
                  </div>
                </div>
                <div className="py-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Unlock className="h-4 w-4 text-yellow-600" />
                      <p className="font-medium">Emergency PIN Used</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      PIN entered by Paramedic ID #27491
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">March 3, 2023</p>
                    <p className="text-xs text-muted-foreground">8:17 PM</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shared" className="pt-4">
              <div className="divide-y">
                <div className="py-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <p className="font-medium">Dr. Sarah Johnson</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Viewed vaccination records
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">June 12, 2023</p>
                    <p className="text-xs text-muted-foreground">2:30 PM</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="all" className="pt-4">
              <div className="text-center py-6 text-muted-foreground">
                <p>
                  Complete access history is available for download as a report.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Generate Access Report
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAccess;
