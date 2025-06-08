import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckSquare, ArrowLeft } from "lucide-react";
import { RecipeTable } from "@/components/recipe/RecipeTable";

export default function RecipesPage() {
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
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tasks
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
            Recipe Collection
          </h2>
          <p className="text-gray-600">
            Discover and explore delicious recipes from around the world.
          </p>
        </div>

        <RecipeTable />
      </main>
    </div>
  );
}
