import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Post, Client } from "@shared/schema";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function RecentPosts() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/recent"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl animate-pulse">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl"></div>
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

  if (!posts || posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No recent posts found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getClientName = (clientId: number) => {
    const client = clients?.find(c => c.id === clientId);
    return client?.name || `Client ${clientId}`;
  };

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
          <CardTitle>Recent Posts</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover-lift">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl overflow-hidden">
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                  <img 
                    src={post.mediaUrls[0]} 
                    alt="Post media" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-image text-gray-400"></i>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {post.platforms.map((platform) => (
                    <i 
                      key={platform}
                      className={`${getPlatformIcon(platform)} ${getPlatformColor(platform)} text-lg`}
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {getClientName(post.clientId)}
                  </span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-1 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status}
                </Badge>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
