import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";
import RecipeList from "@/app/components/recipelistpage/RecipeList.tsx";

type RecipeListPageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  const currentSearchParams = await searchParams;
  const { page, orderBy } = currentSearchParams;
  const recipies = await fetchRecipes(page, orderBy);

  return (
    <div className={"container mx-auto my-4"}>
      <RecipeListNavBar currentSearchParams={currentSearchParams} />
      <RecipeList recipes={recipies} />
      <RecipeListPaginationBar
        pageable={recipies}
        params={currentSearchParams}
      />
    </div>
  );
}
