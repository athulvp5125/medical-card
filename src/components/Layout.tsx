
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  UserCircle,
  FileText,
  Settings,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual auth state

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FileText className="mr-2 h-4 w-4" /> },
    { name: "Emergency", path: "/emergency", icon: <AlertTriangle className="mr-2 h-4 w-4" /> },
    { name: "Profile", path: "/profile", icon: <User className="mr-2 h-4 w-4" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/");
  };

  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">HealthPassport</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </Button>
                <Link to="/profile">
                  <UserCircle className="h-8 w-8 text-gray-600 hover:text-primary transition-colors" />
                </Link>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 bg-white">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 rounded-md hover:bg-muted transition-colors",
                    location.pathname === item.path && "bg-muted font-medium",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </Button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Button asChild variant="outline" onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex-grow flex">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:block w-64 bg-card border-r p-4">
          <nav className="space-y-2 sticky top-24">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-muted transition-colors",
                  location.pathname === item.path && "bg-muted font-medium",
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
