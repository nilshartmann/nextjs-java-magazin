import { ReactNode } from "react";
import RecipesHeader from "@/app/components/layout/RecipesHeader.tsx";
import { Timer } from "@/app/components/Timer.tsx";

type RecipesLayoutProps = {
  children: ReactNode;
};

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return (
    <>
      <RecipesHeader>{<Timer />}</RecipesHeader>
      <main className={"flex flex-grow flex-col"}>
        {children}
        {/*<Suspense fallback={<GlobalLoadingIndicator />}>{children}</Suspense>*/}
      </main>
    </>
  );
}
