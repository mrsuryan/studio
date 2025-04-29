import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowLeft, PlayCircle, CheckCircle } from "lucide-react";

// Mock course data - In a real app, fetch this based on params.id
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/600/400", modules: [{ id: 'm1', title: 'HTML Basics', completed: true }, { id: 'm2', title: 'CSS Fundamentals', completed: true }, { id: 'm3', title: 'JavaScript Introduction', completed: false }] },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/react/600/400", modules: [{ id: 'm4', title: 'React Hooks Deep Dive', completed: true }, { id: 'm5', title: 'State Management (Context API)', completed: false }, { id: 'm6', title: 'Performance Optimization', completed: false }] },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/dsa/600/400", modules: [{ id: 'm7', title: 'Arrays and Strings', completed: false }, { id: 'm8', title: 'Linked Lists', completed: false }, { id: 'm9', title: 'Trees and Graphs', completed: false }] },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis and machine learning with Python.", progress: 15, image: "https://picsum.photos/seed/python/600/400", modules: [{ id: 'm10', title: 'NumPy Essentials', completed: true }, { id: 'm11', title: 'Pandas DataFrames', completed: false }, { id: 'm12', title: 'Introduction to Matplotlib', completed: false }] },
  { id: 5, title: "Cloud Computing Basics", description: "Understand the fundamentals of cloud services.", progress: 0, image: "https://picsum.photos/seed/cloud/600/400", modules: [{ id: 'm13', title: 'What is Cloud Computing?', completed: false }, { id: 'm14', title: 'Service Models (IaaS, PaaS, SaaS)', completed: false }, { id: 'm15', title: 'Major Cloud Providers', completed: false }] },
  { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design.", progress: 50, image: "https://picsum.photos/seed/uiux/600/400", modules: [{ id: 'm16', title: 'User Research Methods', completed: true }, { id: 'm17', title: 'Wireframing and Prototyping', completed: true }, { id: 'm18', title: 'Visual Design Principles', completed: false }] },
];


interface CoursePageProps {
  params: { id: string };
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const courseId = parseInt(params.id, 10);
  const course = allCourses.find(c => c.id === courseId);

  if (!course) {
    return (
       <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-destructive">Course not found</h1>
        <Button variant="link" asChild className="mt-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
      <section className="grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold text-primary">{course.title}</h1>
            <Card>
                <CardHeader className="p-0">
                     <Image
                        src={course.image}
                        alt={course.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg w-full object-cover aspect-video"
                     />
                </CardHeader>
                <CardContent className="pt-6">
                     <CardDescription className="text-base">{course.description}</CardDescription>
                </CardContent>
            </Card>
         </div>

        <div className="md:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold">Course Modules</h2>
             <Card>
                <CardContent className="pt-6 space-y-3">
                    {course.modules.map(module => (
                         <div key={module.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 hover:bg-muted/60 transition-colors">
                             <div className="flex items-center gap-3">
                                {module.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                    <PlayCircle className="h-5 w-5 text-primary" />
                                )}
                                <span className={`text-sm ${module.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{module.title}</span>
                             </div>
                             <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                {module.completed ? 'Review' : 'Start'}
                            </Button>
                        </div>
                    ))}
                     {course.modules.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No modules available for this course yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
