
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Bell, Lock, Globe, Eye, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NotificationsState {
  email: boolean;
  push: boolean;
  sms: boolean;
  recordAccess: boolean;
}

interface PrivacyState {
  twoFactorAuth: boolean;
  shareData: boolean;
}

interface SettingsState {
  darkMode: boolean;
  notifications: NotificationsState;
  privacy: PrivacyState;
  language: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    notifications: {
      email: true,
      push: true,
      sms: false,
      recordAccess: true,
    },
    privacy: {
      twoFactorAuth: true,
      shareData: false,
    },
    language: "en",
  });

  const handleToggle = (field: string, subfield?: string) => {
    if (subfield) {
      if (field === 'notifications') {
        setSettings((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [subfield]: !prev.notifications[subfield as keyof NotificationsState],
          },
        }));

        toast({
          title: "Setting updated",
          description: `${subfield} notifications ${settings.notifications[subfield as keyof NotificationsState] ? "disabled" : "enabled"}.`,
        });
      } else if (field === 'privacy') {
        setSettings((prev) => ({
          ...prev,
          privacy: {
            ...prev.privacy,
            [subfield]: !prev.privacy[subfield as keyof PrivacyState],
          },
        }));

        toast({
          title: "Setting updated",
          description: `${subfield} ${settings.privacy[subfield as keyof PrivacyState] ? "disabled" : "enabled"}.`,
        });
      }
    } else {
      setSettings((prev) => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev],
      }));

      toast({
        title: "Setting updated",
        description: `${field} mode ${settings[field as keyof typeof settings] ? "disabled" : "enabled"}.`,
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setSettings((prev) => ({ ...prev, language: value }));

    toast({
      title: "Language updated",
      description: "Your language preference has been saved.",
    });
  };

  // Map of display names for languages
  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 lg:hidden">Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar - Settings categories on desktop */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <Card className="sticky top-24 animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2" /> Settings
              </CardTitle>
              <CardDescription>Configure your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Desktop tab list */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden lg:block">
                  <TabsList className="grid grid-cols-1 h-auto">
                    <TabsTrigger 
                      value="appearance" 
                      className="justify-start text-left mb-2"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start text-left mb-2"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="privacy" 
                      className="justify-start text-left mb-2"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Privacy & Security
                    </TabsTrigger>
                    <TabsTrigger 
                      value="language" 
                      className="justify-start text-left mb-2"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Language
                    </TabsTrigger>
                    <TabsTrigger 
                      value="account" 
                      className="justify-start text-left mb-2"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Mobile tab list */}
                <div className="lg:hidden">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 gap-2">
                      <TabsTrigger value="appearance">
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Appearance</span>
                      </TabsTrigger>
                      <TabsTrigger value="notifications">
                        <Bell className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Notifications</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                    <TabsList className="grid grid-cols-2 gap-2">
                      <TabsTrigger value="privacy">
                        <Lock className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Privacy</span>
                      </TabsTrigger>
                      <TabsTrigger value="language">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Language</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                    <TabsList className="grid grid-cols-1 gap-2">
                      <TabsTrigger value="account">
                        <User className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Account</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - Settings options */}
        <div className="w-full lg:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="appearance" className="mt-0">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how Health Passport looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={settings.darkMode}
                      onCheckedChange={() => handleToggle('darkMode')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.email}
                      onCheckedChange={() => handleToggle('notifications', 'email')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.push}
                      onCheckedChange={() => handleToggle('notifications', 'push')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={() => handleToggle('notifications', 'sms')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="recordAccess">Record Access Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when someone accesses your records
                      </p>
                    </div>
                    <Switch
                      id="recordAccess"
                      checked={settings.notifications.recordAccess}
                      onCheckedChange={() => handleToggle('notifications', 'recordAccess')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your account security and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require a verification code when logging in
                      </p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={settings.privacy.twoFactorAuth}
                      onCheckedChange={() => handleToggle('privacy', 'twoFactorAuth')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <Label htmlFor="shareData">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymous usage data to improve our service
                      </p>
                    </div>
                    <Switch
                      id="shareData"
                      checked={settings.privacy.shareData}
                      onCheckedChange={() => handleToggle('privacy', 'shareData')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Data Export</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Download a copy of your Health Passport data
                    </p>
                    <Button variant="outline" size="sm">
                      Request Data Export
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Permanently delete your account and all data
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="mt-0">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Choose your preferred language</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Application Language</Label>
                    <Select 
                      value={settings.language} 
                      onValueChange={handleLanguageChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Translation Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="translateMedical" />
                          <Label htmlFor="translateMedical">Automatically translate medical terms</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="translateDocs" />
                          <Label htmlFor="translateDocs">Translate uploaded documents</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Email Address</h3>
                    <p className="text-sm mb-2">sarah.thompson@example.com</p>
                    <Button variant="outline" size="sm">
                      Change Email
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Password</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Last changed 3 months ago
                    </p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Linked Accounts</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Google</p>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Apple</p>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
