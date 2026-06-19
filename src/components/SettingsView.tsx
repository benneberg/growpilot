import * as React from "react";
import { Settings, User, Shield, Bell, Key, Database, Globe, Github, FileText, Layout, Moon, Sun, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";
import { Separator } from "./ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { useToast } from "./ui/Toast";

export function SettingsView() {
  const { addToast } = useToast();

  const handleSave = () => {
    addToast("Settings saved successfully!", "success");
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
          <Settings className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Manage your account, API keys, notifications, and application preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start gap-2 bg-slate-100 text-slate-900">
              <User className="h-4 w-4" />
              Account
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-slate-500">
              <Shield className="h-4 w-4" />
              Security
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-slate-500">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-slate-500">
              <Key className="h-4 w-4" />
              API Keys
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-slate-500">
              <Database className="h-4 w-4" />
              Integrations
            </Button>
          </nav>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and how others see you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Growth Engineer at ClarityScope" />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-500">Receive weekly audit summaries via email.</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Audit</Label>
                  <p className="text-sm text-slate-500">Automatically audit your primary site every 24 hours.</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-slate-500">Toggle between light and dark themes.</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white shadow-sm">
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-red-900">Danger Zone</CardTitle>
              <CardDescription className="text-red-700">Irreversible actions for your account and data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-red-900">Delete Account</Label>
                  <p className="text-sm text-red-700">Permanently delete your account and all audit history.</p>
                </div>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
