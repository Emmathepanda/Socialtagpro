import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Image, 
  BarChart3, 
  Settings,
  Plus,
  Upload
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Scheduler", href: "/scheduler", icon: Calendar },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Media", href: "/media", icon: Image },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 hidden lg:block">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-3 hover-lift",
                    isActive && "bg-primary text-white",
                    !isActive && "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white hover-lift">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
            <Button variant="outline" className="w-full hover-lift">
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
