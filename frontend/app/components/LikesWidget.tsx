import { RecipeDto } from "@/app/components/api-types.ts";
import { revalidatePath } from "next/cache";
import { saveLike } from "@/app/components/queries.ts";
import LikeButton from "@/app/components/LikeButton.tsx";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  async function handleSubmit(formdata: FormData) {
    "use server";
    // Der Zugriff auf formdata dient hier nur als Beispiel,
    // wie man mit den Formdaten arbeiten kann.
    //
    // Im konrekten Fall (recipeId) könnte man hier auch
    // auf recipe.id direkt zugreifen
    const recipeId = formdata.get("recipeId") as string;

    await saveLike(recipeId);

    // Next.js-Cache invalidieren
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${recipeId}`);
  }

  return (
    <form action={handleSubmit} className={"inline-block"}>
      <input type="hidden" name="recipeId" value={recipe.id} />
      <LikeButton likes={recipe.likes} />
    </form>
  );
}
