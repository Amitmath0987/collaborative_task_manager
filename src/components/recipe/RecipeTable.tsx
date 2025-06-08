"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Clock, ChefHat, Loader2 } from "lucide-react";
import { ProcessedRecipe } from "@/lib/types";
import { useRecipeSearch } from "@/app/hooks/useRecipes";
import { Badge } from "../ui/badge";

export function RecipeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<ProcessedRecipe | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: recipes,
    isLoading,
    error,
    isFetching,
  } = useRecipeSearch(searchTerm);

  // Debounced search to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleViewRecipe = (recipe: ProcessedRecipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading recipes. Please try again later.</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Recipe Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {isFetching && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            )}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {recipes && `Found ${recipes.length} recipes`}
          </div>
        </CardContent>
      </Card>

      {/* Recipe Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading recipes...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Ingredients</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Instructions
                  </TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes && recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <TableRow key={recipe.id} className="hover:bg-gray-50">
                      <TableCell>
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-recipe.jpg";
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-xs">
                          <p className="font-semibold">{recipe.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {recipe.ingredients
                            .slice(0, 3)
                            .map((ingredient, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {ingredient.name}
                              </Badge>
                            ))}
                          {recipe.ingredients.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{recipe.ingredients.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-sm text-gray-600 max-w-md">
                          {truncateText(recipe.instructions, 80)}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRecipe(recipe)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm
                        ? "No recipes found matching your search."
                        : "No recipes available."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Recipe Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {selectedRecipe.name}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-recipe.jpg";
                    }}
                  />
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    Ingredients
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-sm text-gray-600">
                          {ingredient.measure}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Instructions
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedRecipe.instructions}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
