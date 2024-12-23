import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import RecipifyIcon from "@/app/components/RecipifyIcon.tsx";

export default function RecipePageLoading() {
  return (
    <div className={"mt-8 h-full"}>
      <LoadingIndicator placeholder={<RecipifyIcon />}>
        Stay tuned
      </LoadingIndicator>
    </div>
  );
}
