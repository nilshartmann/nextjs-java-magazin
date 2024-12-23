import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { slowDown_search } from "@/app/demo-config.tsx";
import { RecipeSummaryDto } from "@/app/components/api-types.ts";

export function useSearchQuery(search: string) {
  const result = useSuspenseInfiniteQuery({
    queryKey: ["search", search],
    queryFn: async (page) => {
      console.log("searching for", search);
      const result = await fetchFromApi(
        getEndpointConfig("get", "/api/search"),
        {
          query: {
            search,
            slowdown: slowDown_search,
            page: page.pageParam,
          },
        },
      );
      console.log("search returned for", search);
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.pageNumber + 1 : null;
    },
    getPreviousPageParam: () => null,
  });

  const hasHits = result.data.pages[0]?.totalPages > 0;
  const allRecipes = result.data.pages.reduce((prev, cur) => {
    return [...prev, ...cur.content];
  }, [] as RecipeSummaryDto[]);

  return { ...result, allRecipes, hasHits } as const;
}
