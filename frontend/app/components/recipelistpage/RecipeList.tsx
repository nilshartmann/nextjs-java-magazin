import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

type RecipeListProps = {
  recipes: PageResponseRecipeDto;
};

export default async function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {recipes.content.map((recipe) => {
        return (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}
