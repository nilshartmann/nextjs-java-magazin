"use client";

import { useState } from "react";
import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/recipepage/IngredientsList.tsx";
import IconButton from "@/app/components/recipepage/IconButton.tsx";

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsSection({ ingredients }: IngredientsProps) {
  // Diese Komponente wird IM BROWSER ausgeführt
  //   -> JS-Code kommt in den Browser
  // Aufgerufen wird sie aber aus einer SERVER-Komponente
  //   -> RecipePageContent.tsx
  //   -> 'ingredients'-Properties werden automatisch serialisiert

  const [servings, setServings] = useState(4);
  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={
            "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
          }
        >
          <IconButton
            icon={"plus"}
            onButtonClick={() => setServings(servings + 1)}
          />
          <span className={"text-gray-500"}> {servings} servings </span>
          <IconButton
            icon={"minus"}
            disabled={servings === 1}
            onButtonClick={() => setServings(servings - 1)}
          />
        </div>
      </div>
      <IngredientList ingredients={ingredients} servings={servings} />
    </>
  );
}
