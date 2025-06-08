"use client";

import { useQuery } from "@tanstack/react-query";
import { Recipe, RecipeApiResponse, ProcessedRecipe } from "@/lib/types";

const MEAL_DB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Function to process raw recipe data
const processRecipe = (recipe: Recipe): ProcessedRecipe => {
  const ingredients = [];

  // Extract ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return {
    id: recipe.idMeal,
    name: recipe.strMeal,
    instructions: recipe.strInstructions,
    image: recipe.strMealThumb,
    ingredients,
  };
};

// Fetch all recipes (using search by first letter to get a variety)
const fetchAllRecipes = async (): Promise<ProcessedRecipe[]> => {
  const letters = ["a", "b", "c", "d", "e"]; // Limited set for demo
  const allRecipes: ProcessedRecipe[] = [];

  for (const letter of letters) {
    try {
      const response = await fetch(
        `${MEAL_DB_BASE_URL}/search.php?f=${letter}`
      );
      if (!response.ok)
        throw new Error(`Failed to fetch recipes for letter ${letter}`);

      const data: RecipeApiResponse = await response.json();
      if (data.meals) {
        const processedRecipes = data.meals.map(processRecipe);
        allRecipes.push(...processedRecipes);
      }
    } catch (error) {
      console.error(`Error fetching recipes for letter ${letter}:`, error);
    }
  }

  return allRecipes;
};

// Search recipes by name
const searchRecipes = async (
  searchTerm: string
): Promise<ProcessedRecipe[]> => {
  if (!searchTerm.trim()) {
    return fetchAllRecipes();
  }

  try {
    const response = await fetch(
      `${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
    );
    if (!response.ok) throw new Error("Failed to fetch recipes");

    const data: RecipeApiResponse = await response.json();

    if (!data.meals) {
      return [];
    }

    return data.meals.map(processRecipe);
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

// Custom hook for fetching all recipes
export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Custom hook for searching recipes
export const useRecipeSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["recipes", "search", searchTerm],
    queryFn: () => searchRecipes(searchTerm),
    enabled: true, // Always enabled, will return all recipes if searchTerm is empty
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for fetching a single recipe by ID
export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async (): Promise<ProcessedRecipe | null> => {
      try {
        const response = await fetch(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");

        const data: RecipeApiResponse = await response.json();

        if (!data.meals || data.meals.length === 0) {
          return null;
        }

        return processRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 20 * 60 * 1000, // 20 minutes
  });
};
