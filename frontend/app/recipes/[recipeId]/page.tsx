import { fetchFeedback, fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";
import { notFound } from "next/navigation";

type RecipePageProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  //
  // !! Das hier ist SERVER-SEITIGER Code !!
  //

  const { recipeId } = await params;

  const feedbackPromise = fetchFeedback(recipeId);

  const result = await fetchRecipe(recipeId);

  if (!result) {
    notFound();
  }

  return (
    <RecipePageContent
      recipe={result.recipe}
      feedbackPromise={feedbackPromise}
    />
  );
}
