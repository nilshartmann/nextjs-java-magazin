import {
  NewFeedback,
  PageResponseRecipeDto,
} from "@/app/components/api-types.ts";
import {
  fetchFromApi,
  fetchNullableFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import {
  recipesPerPage,
  slowDown_AddFeedback,
  slowDown_GetFeedbacks,
  slowDown_GetRecipe,
  slowDown_GetRecipeList,
  slowDown_IncreaseLikes,
} from "@/app/demo-config.tsx";

export function fetchRecipes(
  page: number | string = 0,
  orderBy?: string | "time" | "likes",
  ids?: string[],
): Promise<PageResponseRecipeDto> {
  const thePage = typeof page === "string" ? parseInt(page) : page;

  const theOrderBy = !orderBy
    ? undefined
    : orderBy === "time" || orderBy === "likes"
      ? orderBy
      : undefined;

  const idsString = ids?.join(",");
  const result = fetchFromApi(
    getEndpointConfig("get", "/api/recipes"),
    {
      query: {
        page: thePage,
        size: recipesPerPage,
        sort: theOrderBy,
        ids: idsString,
        slowdown: slowDown_GetRecipeList,
      },
    },
    ["recipes"],
  );

  return result;
}

export function fetchRecipe(recipeId: string) {
  return fetchNullableFromApi(
    getEndpointConfig("get", "/api/recipes/{recipeId}"),
    {
      path: {
        recipeId,
      },
      query: {
        slowdown: slowDown_GetRecipe,
      },
    },
    [`recipes/${recipeId}`],
  );
}

export function fetchFeedback(recipeId: string) {
  return fetchFromApi(
    getEndpointConfig("get", "/api/recipes/{recipeId}/feedbacks"),
    {
      path: {
        recipeId,
      },
      query: {
        slowdown: slowDown_GetFeedbacks,
      },
    },
  );
}

export function saveFeedback(recipeId: string, newFeedback: NewFeedback) {
  return fetchFromApi(
    getEndpointConfig("post", "/api/recipes/{recipeId}/feedbacks"),
    {
      path: { recipeId },
      body: { feedbackData: newFeedback },
      query: {
        slowdown: slowDown_AddFeedback,
      },
    },
  );
}

export function saveLike(recipeId: string) {
  return fetchFromApi(
    getEndpointConfig("patch", "/api/recipes/{recipeId}/likes"),
    {
      path: {
        recipeId,
      },
      query: {
        slowdown: slowDown_IncreaseLikes,
      },
    },
  );
}
