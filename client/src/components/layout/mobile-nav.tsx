import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Image, 
  BarChart3
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Schedule", href: "/scheduler", icon: Calendar },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Media", href: "/media", icon: Image },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2",
                  isActive && "text-primary",
                  !isActive && "text-gray-600 dark:text-gray-400"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
