import { RecipeCategories } from "@/app/components/RecipeCategories.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetRecipeResponse } from "@/app/components/api-types.ts";
import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { slowDown_GetRecipe } from "@/app/demo-config.tsx";

type RecipeSummaryDetailsProps = {
  recipeId: string;
};
export default function RecipeSummaryDetails({
  recipeId,
}: RecipeSummaryDetailsProps) {
  // note: in real life, we would probably go
  const { data } = useSuspenseQuery<GetRecipeResponse>({
    queryKey: ["recipes", recipeId],
    queryFn: () => {
      return fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
        path: {
          recipeId,
        },
        query: {
          slowdown: slowDown_GetRecipe,
        },
      });
    },
  });

  return (
    <div className={"mt-4 space-y-4"}>
      <p>{data.recipe.headline}</p>
      <RecipeCategories recipe={data.recipe} />
    </div>
  );
}
