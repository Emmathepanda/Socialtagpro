import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@shared/schema";

export function ClientList() {
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients/active"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl animate-pulse">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No active clients found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      instagram: "fab fa-instagram",
      facebook: "fab fa-facebook",
      twitter: "fab fa-twitter",
      tiktok: "fab fa-tiktok",
      linkedin: "fab fa-linkedin",
    };
    return icons[platform] || "fas fa-share-alt";
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      instagram: "text-[hsl(var(--instagram))]",
      facebook: "text-[hsl(var(--facebook))]",
      twitter: "text-[hsl(var(--twitter))]",
      tiktok: "text-[hsl(var(--tiktok))]",
      linkedin: "text-[hsl(var(--linkedin))]",
    };
    return colors[platform] || "text-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Active Clients</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover-lift">
              <Avatar className="w-10 h-10">
                <AvatarImage src={client.logo || undefined} alt={client.name} />
                <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{client.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {client.postsCount} posts this month
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {client.platforms.map((platform) => (
                  <i 
                    key={platform}
                    className={`${getPlatformIcon(platform)} ${getPlatformColor(platform)} text-sm`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
