import { RecipeSummaryDto } from "@/app/components/api-types.ts";
import { Suspense, useState } from "react";
import { H2 } from "@/app/components/Heading.tsx";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import RecipeSummaryDetails from "@/app/recipes/search/RecipeSummaryDetails.tsx";

type RecipeSummaryCardProps = {
  recipe: RecipeSummaryDto;
};
export default function RecipeSummaryCard({ recipe }: RecipeSummaryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={recipe.id}
      className="transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl"
    >
      <div className="flex justify-between space-x-2">
        <div className={"flex w-2/3 flex-col justify-between"}>
          <div className={"space-y-2"}>
            <p className="font-space text-sm font-medium uppercase tracking-[2px] text-red">
              {recipe.mealType}
            </p>
            <H2 className="font-space font-bold hover:cursor-pointer">
              <Link
                href={`/recipes/${recipe.id}`}
                className="hover:cursor-pointer hover:text-orange_2 hover:underline"
              >
                {recipe.title}
              </Link>
            </H2>
          </div>
          <div>
            <i
              className={twMerge(
                "fa-solid cursor-pointer text-orange",
                isOpen ? "fa-angles-up" : "fa-angles-down",
              )}
              onClick={() => setIsOpen((o) => !o)}
            ></i>
          </div>
        </div>
        <div className={"w-1/3"}>
          <div className="overflow-hidden">
            <img
              className="mb-2 h-24 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
              src={`/images/recipes/food_${recipe.id}.png`}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <RecipeSummaryDetails recipeId={recipe.id} />
        </Suspense>
      )}
    </div>
  );
}
