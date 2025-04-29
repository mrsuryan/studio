import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks } from "lucide-react";

// Mock assignment data
const assignments = [
  { id: 1, title: "HTML Basics Quiz", course: "Introduction to Web Development", dueDate: "2024-08-15", status: "Submitted" },
  { id: 2, title: "React State Management", course: "Advanced React Concepts", dueDate: "2024-08-20", status: "Pending" },
  { id: 3, title: "Algorithm Analysis", course: "Data Structures and Algorithms", dueDate: "2024-08-25", status: "Pending" },
  { id: 4, title: "CSS Flexbox Challenge", course: "Introduction to Web Development", dueDate: "2024-08-10", status: "Graded" },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted': return 'secondary';
    case 'pending': return 'default';
    case 'graded': return 'outline';
    default: return 'secondary';
  }
};


export default function AssignmentsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
         <ListChecks className="h-8 w-8" /> Assignments
      </h1>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{assignment.title}</CardTitle>
               <Badge variant={getStatusVariant(assignment.status)}>{assignment.status}</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Course: {assignment.course} | Due: {assignment.dueDate}
              </CardDescription>
              {/* Add link or button to view/submit assignment */}
            </CardContent>
          </Card>
        ))}
      </div>
       {assignments.length === 0 && (
          <p className="text-muted-foreground">You have no assignments currently.</p>
        )}
    </div>
  );
}
