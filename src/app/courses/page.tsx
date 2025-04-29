import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";

// Mock course data (can be fetched from an API later)
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/react/300/200" },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/dsa/300/200" },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis and machine learning with Python.", progress: 15, image: "https://picsum.photos/seed/python/300/200" },
  { id: 5, title: "Cloud Computing Basics", description: "Understand the fundamentals of cloud services.", progress: 0, image: "https://picsum.photos/seed/cloud/300/200" },
   { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design.", progress: 50, image: "https://picsum.photos/seed/uiux/300/200" },
];


export default function CoursesPage() {
  return (
    <div className="space-y-8">
       <section>
        <h1 className="text-3xl font-bold text-primary mb-4">All Courses</h1>
         <p className="text-lg text-muted-foreground mb-6">
          Browse through our available courses and start learning today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course) => (
             <Card key={course.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="rounded-t-lg w-full object-cover aspect-[3/2]"
                />
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 pt-4">
                 <div className="w-full">
                   <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                   </div>
                   <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} />
                 </div>
                 <Button variant={course.progress > 0 ? "outline" : "default"} size="sm" asChild className="mt-2 self-end border-primary text-primary hover:bg-primary/10 hover:text-primary data-[variant=default]:bg-primary data-[variant=default]:text-primary-foreground data-[variant=default]:hover:bg-primary/90">
                    <Link href={`/courses/${course.id}`}>
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
