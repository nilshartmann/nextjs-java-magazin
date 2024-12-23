import Label from "@/app/components/Label.tsx";
import RecipeSummaryCard from "@/app/recipes/search/RecipeSummaryCard.tsx";
import { Button } from "@/app/components/Button.tsx";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { useSearchQuery } from "@/app/recipes/search/use-search-query.ts";
import { RecipeSummaryDto } from "@/app/components/api-types.ts";

type SearchProps = {
  search: string;
};

// BEISPIEL::::
//
//  Integration mit TanStack Query (client-side React)

export default function RecipeSearch({ search }: SearchProps) {
  const query = useSearchQuery(search);

  if (!query.hasHits) {
    return <Label>No recipes found.</Label>;
  }

  return (
    <>
      <Label>Recipes for {search}</Label>

      <SearchResultList recipes={query.allRecipes} />

      {query.hasNextPage && (
        <FindMoreButton
          isFetching={query.isFetchingNextPage}
          onClick={query.fetchNextPage}
        />
      )}

      {query.hasNextPage || <Label>No more recipes. Happy cooking!</Label>}
    </>
  );
}

type FindMoreButtonProps = {
  isFetching: boolean;
  onClick(): void;
};

function FindMoreButton({ isFetching, onClick }: FindMoreButtonProps) {
  return (
    <div className="flex justify-center">
      <Button>
        {isFetching ? (
          <LoadingIndicator secondary />
        ) : (
          <button onClick={() => onClick()}>Find more...</button>
        )}
      </Button>
    </div>
  );
}

type SearchResultListProps = {
  recipes: RecipeSummaryDto[];
};
function SearchResultList({ recipes }: SearchResultListProps) {
  return recipes.map((recipe) => (
    <RecipeSummaryCard key={recipe.id} recipe={recipe} />
  ));
}
