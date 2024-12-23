"use client";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
import { LikeLoadingIndicator } from "@/app/components/LoadingIndicator.tsx";
import LikeIcon from "@/app/components/LikeIcon.tsx";

type LikeButtonProps = {
  likes: number;
};

export default function LikeButton({ likes }: LikeButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type={"submit"}
      disabled={pending}
      className={twMerge(
        "me-2 flex space-x-2 rounded border border-orange_2 bg-white p-2 text-[15px] text-orange_2 hover:cursor-pointer hover:bg-orange_2 hover:text-white disabled:cursor-default disabled:border-gray-900 disabled:bg-gray-300 disabled:text-gray-900 disabled:hover:text-gray-900",
      )}
    >
      <span>{likes}</span>
      {pending ? <LikeLoadingIndicator /> : <LikeIcon />}
    </button>
  );
}
