import * as React from "react";
import { Search, History, Settings, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { Container } from "./Layout";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { useAuditStore } from "../../store/useAuditStore";
import { cn } from "../../lib/utils";

export function Navbar({ onNavigate, activeView }: { onNavigate: (view: any) => void, activeView: string }) {
  const { setCurrentAudit } = useAuditStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                setCurrentAudit(null);
                onNavigate("dashboard");
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                <Search className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                GrowPilot
              </span>
            </div>

            <div className="hidden items-center gap-1 md:flex">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(activeView === "dashboard" && "bg-slate-100")}
                onClick={() => {
                  setCurrentAudit(null);
                  onNavigate("dashboard");
                }}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(activeView === "history" && "bg-slate-100")}
                onClick={() => {
                  setCurrentAudit(null);
                  onNavigate("history");
                }}
              >
                History
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(activeView === "settings" && "bg-slate-100")}
                onClick={() => {
                  setCurrentAudit(null);
                  onNavigate("settings");
                }}
              >
                Settings
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-slate-100 transition-transform hover:scale-105">
                    <AvatarImage src="https://picsum.photos/seed/user/200" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="right" className="w-56">
                  <DropdownMenuItem onClick={() => onNavigate("settings")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <div className="my-1 h-px bg-slate-100" />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => { 
                setCurrentAudit(null); 
                onNavigate("dashboard");
                setIsMenuOpen(false); 
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => { 
                setCurrentAudit(null); 
                onNavigate("history");
                setIsMenuOpen(false); 
              }}
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => { 
                onNavigate("settings");
                setIsMenuOpen(false); 
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
