"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageButton } from "@/app/components/Button.tsx";

type PageLinkButtonProps = {
  page: number;
  label: string;
};

export default function PageLinkButton({ page, label }: PageLinkButtonProps) {
  // https://github.com/vercel/next.js/discussions/47583#discussioncomment-5449707
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  current.set("feedback_page", String(page));

  return (
    <Link
      replace={true}
      href={{
        query: current.toString(),
      }}
    >
      <PageButton state={{ label, state: "active" }} />
    </Link>
  );
}
