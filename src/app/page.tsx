import { TaskBoard } from "@/components/task/TaskBoard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckSquare, ChefHat } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/recipes">
                <Button variant="outline">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Recipes
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Collaborative Task Manager
          </h2>
          <p className="text-gray-600">
            Organize, track, and manage your tasks efficiently with
            drag-and-drop functionality.
          </p>
        </div>

        <TaskBoard />
      </main>
    </div>
  );
}
