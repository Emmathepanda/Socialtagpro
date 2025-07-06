import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";

export default function Scheduler() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Scheduler</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Plan and schedule your social media posts across all platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Content Calendar</span>
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Calendar view will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Queue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p>No posts in queue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
