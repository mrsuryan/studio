import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing } from "lucide-react";

// Mock activity data
const activities = [
  { id: 1, description: "Completed 'Introduction to HTML' lesson.", timestamp: "2 hours ago" },
  { id: 2, description: "Submitted 'HTML Basics Quiz'.", timestamp: "1 day ago" },
  { id: 3, description: "Started 'Advanced React Concepts' course.", timestamp: "3 days ago" },
  { id: 4, description: "Received grade for 'CSS Flexbox Challenge'.", timestamp: "5 days ago" },
];

export default function ActivitiesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
        <BellRing className="h-8 w-8" /> Recent Activities
      </h1>

       <Card>
         <CardContent className="pt-6 space-y-4">
           {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-muted-foreground">No recent activities to display.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
