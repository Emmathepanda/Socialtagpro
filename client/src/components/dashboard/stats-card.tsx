import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("hover-lift", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
        {change && (
          <div className="mt-4">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
