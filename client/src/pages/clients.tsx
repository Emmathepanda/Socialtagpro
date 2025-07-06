import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@shared/schema";
import { Plus, Users, MoreHorizontal } from "lucide-react";

export default function Clients() {
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Clients</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your clients and their social media accounts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Clients</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your clients and their social media accounts.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {!clients || clients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No clients yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              Start by adding your first client to manage their social media accounts.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={client.logo || undefined} alt={client.name} />
                      <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {client.postsCount} posts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={client.isActive ? "default" : "secondary"}>
                      {client.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Platforms:</p>
                    <div className="flex items-center space-x-2">
                      {client.platforms.map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg"
                        >
                          <i className={`${getPlatformIcon(platform)} ${getPlatformColor(platform)} text-sm`} />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {platform}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
