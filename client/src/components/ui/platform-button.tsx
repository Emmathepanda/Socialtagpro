import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Platform, PLATFORMS } from "@shared/schema";

interface PlatformButtonProps {
  platform: Platform;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlatformButton({
  platform,
  selected = false,
  onClick,
  size = "md",
  className,
}: PlatformButtonProps) {
  const platformConfig = PLATFORMS[platform];
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <Button
      variant={selected ? "default" : "outline"}
      onClick={onClick}
      className={cn(
        "hover-lift transition-all duration-200",
        sizeClasses[size],
        selected && `platform-${platform}`,
        !selected && "hover:opacity-80",
        className
      )}
    >
      <i className={cn(platformConfig.icon, "mr-2")} />
      {platformConfig.name}
    </Button>
  );
}
