import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { TeamActivity, User } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export function TeamActivityComponent() {
  const { data: activities, isLoading } = useQuery<TeamActivity[]>({
    queryKey: ["/api/team-activity"],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
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

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No recent team activity.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getUserById = (userId: number) => {
    return users?.find(u => u.id === userId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const user = getUserById(activity.userId);
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
                  <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{user?.name || "Unknown User"}</span>{" "}
                    {activity.action} {activity.targetType}
                    {activity.details && (
                      <span className="text-gray-600 dark:text-gray-400"> - {activity.details}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
