
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Shield, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Dummy user data - in a real app this would come from an API or state management
  const [userData, setUserData] = useState({
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA",
    emergencyContact: "John Thompson +1 (555) 987-6543",
  });

  const handleSave = () => {
    // In a real app, this would make an API call to update the user data
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 md:hidden">Profile</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar - User avatar and quick info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-4 relative">
                <User className="h-16 w-16 text-secondary-foreground" />
                {isEditing && (
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                  >
                    <span className="sr-only">Edit avatar</span>
                    <Mail className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-muted-foreground flex items-center mt-1">
                <Shield className="h-4 w-4 mr-1" />
                Health Passport User
              </p>
              <div className="w-full mt-6">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Emergency Access</CardTitle>
              <CardDescription>Quick access to critical information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <div className="w-32 h-32 border-4 border-primary rounded-lg bg-muted flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="ghost" size="sm" className="text-white">View QR</Button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Scan for emergency</p>
                    <p className="text-sm font-semibold">QR CODE</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="w-full">
                Setup Emergency Access
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content - User details */}
        <div className="w-full lg:w-2/3">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="contact">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <InputWithIcon
                        id="name"
                        name="name"
                        value={userData.name} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={<User className="h-4 w-4 text-muted-foreground" />}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <InputWithIcon
                        id="email"
                        name="email"
                        value={userData.email} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <InputWithIcon
                        id="phone"
                        name="phone"
                        value={userData.phone} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <InputWithIcon
                        id="address"
                        name="address"
                        value={userData.address} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Allergies</h3>
                      <p className="text-sm text-muted-foreground">None specified</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Chronic Conditions</h3>
                      <p className="text-sm text-muted-foreground">None specified</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Current Medications</h3>
                      <p className="text-sm text-muted-foreground">None specified</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Blood Type</h3>
                      <p className="text-sm text-muted-foreground">Not specified</p>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full mt-2">
                        Manage Medical Information
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Emergency Contact</h3>
                <InputWithIcon
                  id="emergencyContact"
                  name="emergencyContact"
                  value={userData.emergencyContact} 
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
            </CardContent>
            <CardFooter>
              {isEditing && (
                <Button onClick={handleSave} className="ml-auto">
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
