import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  icon: "plus" | "minus";
  onButtonClick(): void;
  disabled?: boolean;
};

export default function IconButton({
  disabled,
  icon,
  onButtonClick,
}: IconButtonProps) {
  return (
    <button onClick={disabled ? undefined : onButtonClick}>
      <i
        className={twMerge(
          icon === "plus" ? "fa-circle-plus" : "fa-circle-minus",
          "fa-solid p-2 text-orange_2",
          disabled ? "" : "hover:cursor-pointer hover:text-orange_2-500",
        )}
      />
    </button>
  );
}
