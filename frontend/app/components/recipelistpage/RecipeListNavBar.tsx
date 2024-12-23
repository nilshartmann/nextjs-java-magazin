import ButtonBar from "../ButtonBar.tsx";
import { NavButtonBar } from "../NavButtonBar.tsx";
import { OrderButton } from "@/app/components/recipelistpage/OrderButton.tsx";

type RecipeListNavBarProps = {
  currentSearchParams: Record<string, string>;
};

export default function RecipeListNavBar({
  currentSearchParams,
}: RecipeListNavBarProps) {
  return (
    <NavButtonBar align={"right"}>
      <ButtonBar>
        <OrderButton
          currentSearchParams={currentSearchParams}
          orderBy={undefined}
        >
          Newest first
        </OrderButton>
        <OrderButton
          currentSearchParams={currentSearchParams}
          orderBy={"likes"}
        >
          Most liked
        </OrderButton>
        <OrderButton currentSearchParams={currentSearchParams} orderBy={"time"}>
          Shortest time
        </OrderButton>
      </ButtonBar>
    </NavButtonBar>
  );
}
