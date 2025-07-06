import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { PostComposer } from "@/components/dashboard/post-composer";
import { ClientList } from "@/components/dashboard/client-list";
import { UpcomingPosts } from "@/components/dashboard/upcoming-posts";
import { TeamActivityComponent } from "@/components/dashboard/team-activity";
import { 
  BarChart3, 
  Users, 
  Clock, 
  Heart 
} from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your social media accounts.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Posts"
          value={stats?.totalPosts || 0}
          change="+12% from last month"
          icon={BarChart3}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          title="Active Clients"
          value={stats?.activeClients || 0}
          change="+2 new this month"
          icon={Users}
          iconColor="text-green-600 dark:text-green-400"
        />
        <StatsCard
          title="Scheduled Posts"
          value={stats?.scheduledPosts || 0}
          change="Next: Today 3:00 PM"
          icon={Clock}
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatsCard
          title="Total Engagement"
          value={stats?.totalEngagement ? `${(stats.totalEngagement / 1000).toFixed(1)}K` : "0"}
          change="+8% from last week"
          icon={Heart}
          iconColor="text-orange-600 dark:text-orange-400"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <RecentPosts />
          <PostComposer />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <ClientList />
          <UpcomingPosts />
          <TeamActivityComponent />
        </div>
      </div>
    </div>
  );
}
