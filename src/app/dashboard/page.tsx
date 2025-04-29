import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your enrolled courses.</p>
             {/* Add course list or summary here */}
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
             <p>Stay on track with assignment due dates.</p>
            {/* Add deadline list here */}
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <p>See your latest interactions and progress.</p>
             {/* Add activity feed here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
