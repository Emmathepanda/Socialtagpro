import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Post, Client } from "@shared/schema";
import { format } from "date-fns";

export function UpcomingPosts() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/scheduled"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-l-4 border-gray-200 dark:border-gray-600 pl-4 py-2 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
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
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No upcoming posts scheduled.</p>
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

  const getBorderColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      instagram: "border-[hsl(var(--instagram))]",
      facebook: "border-[hsl(var(--facebook))]",
      twitter: "border-[hsl(var(--twitter))]",
      tiktok: "border-[hsl(var(--tiktok))]",
      linkedin: "border-[hsl(var(--linkedin))]",
    };
    return colors[platform] || "border-gray-300";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className={`border-l-4 ${getBorderColor(post.platforms[0])} pl-4 py-2`}>
              <div className="flex items-center space-x-2 mb-1">
                <i className={`${getPlatformIcon(post.platforms[0])} ${getPlatformColor(post.platforms[0])} text-sm`} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {post.scheduledAt ? format(new Date(post.scheduledAt), "PPp") : "Not scheduled"}
                </span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium line-clamp-2">
                {post.content}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getClientName(post.clientId)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
