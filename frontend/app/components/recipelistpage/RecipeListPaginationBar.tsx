import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import Link from "next/link";

type RecipeListPaginationBarProps = {
  pageable: {
    totalPages: number;
  };
  params: Record<string, string>;
};

export default function RecipeListPaginationBar({
  pageable,
  params,
}: RecipeListPaginationBarProps) {
  const totalPages = pageable.totalPages; // pageCountPromise.then((t) => t.totalPages);
  const currentPage = parseInt(params.page || "0");

  return (
    <div className={"mt-8 flex justify-center"}>
      <PaginationBar totalPages={totalPages} currentPage={currentPage}>
        {(btn) =>
          btn.disabled ? (
            <PageButton state={btn} />
          ) : (
            <Link href={buildUrl("/recipes", { ...params, page: btn.page })}>
              <PageButton state={btn} />
            </Link>
          )
        }
      </PaginationBar>
    </div>
  );
}

export function buildUrl(
  path: string | null | undefined,
  newParams: Record<
    string,
    string | number | boolean | undefined | null | string[]
  >,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(newParams)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((element) => {
          params.append(key, element.toString());
        });
      } else {
        params.append(key, value.toString());
      }
    }
  }

  // console.log("newParams", newParams, "params", params);

  const paramsString = params.toString();

  if (!path) {
    if (!paramsString) {
      return "";
    }

    return `?${paramsString}`;
  }

  if (!paramsString) {
    return path;
  }

  return `${path}?${paramsString}`;
}
