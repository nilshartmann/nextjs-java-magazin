"use client";
import { Input } from "@/app/components/Input.tsx";
import Label from "../../components/Label.tsx";
import { Suspense, useState } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { useDebounce } from "use-debounce";
import RecipeSearch from "@/app/recipes/search/RecipeSearch.tsx";
import { usePathname, useSearchParams } from "next/navigation";
import { debounce_search } from "@/app/demo-config.tsx";

export default function SearchPage() {
  // updating the search params without re-fetching from server:
  //  see https://github.com/vercel/next.js/discussions/18072#discussioncomment-10697745
  const searchParams = useSearchParams();
  const searchTermInParams = searchParams.get("search");
  const [search, setSearch] = useState(searchTermInParams || "");
  const [searchTerm] = useDebounce(search, debounce_search);

  const pathname = usePathname();

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);

    const current = new URLSearchParams(searchParams);
    current.set("search", newSearch);

    const newUrl = `${pathname}?${current.toString()}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );
  };

  return (
    <>
      <main className={"flex-grow"}>
        <div className="container mx-auto mt-8 flex max-w-96 pt-8">
          <Input
            type="search"
            name="search"
            autoComplete="off"
            aria-label="Enter at least three chars to start searching for recipes"
            className="h-8 p-6 hover:shadow-lg"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button
            onClick={() => handleSearchChange("")}
            className="ms-2 cursor-pointer text-gray-500 underline hover:text-gray-900"
          >
            Clear
          </button>
        </div>
        <div className="container mx-auto mt-2 w-1/4 space-y-8 rounded-lg pb-8 pt-8">
          {search.length < 3 ? (
            <Label>Type three letters to start search</Label>
          ) : (
            <Suspense fallback={<LoadingIndicator />}>
              <RecipeSearch search={searchTerm} />
            </Suspense>
          )}
        </div>
      </main>
    </>
  );
}
