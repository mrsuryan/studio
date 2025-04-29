import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";

// Mock course data
const featuredCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/react/300/200" },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/dsa/300/200" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">Welcome to EduHub Portal</h1>
        <p className="text-xl text-muted-foreground">
          Your journey to knowledge starts here. Explore our courses and enhance your skills.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
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
                 <Button variant="outline" size="sm" asChild className="mt-2 self-end border-primary text-primary hover:bg-primary/10 hover:text-primary">
                    <Link href={`/courses/${course.id}`}>
                      Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
         <div className="text-center mt-8">
            <Button asChild>
                <Link href="/courses">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
