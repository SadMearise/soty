import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

type TagButtonProps = {
  to: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const classes = {
  button:
    "font-normal text-sm text-white truncate px-[12px] py-[6px] bg-white/[.07] rounded-full transition-all duration-200 ease hover:bg-white/10 active:bg-white/[.04]",
  active: "!text-black !bg-white",
};

const TagButton: FC<TagButtonProps> = ({ to, title, isActive, onClick }) => {
  return (
    <Link to={to}>
      <Button
        as="button"
        type="button"
        aria-label={title}
        onClick={onClick}
        styles={`${classes.button}${isActive ? ` ${classes.active}` : ""}`}
      >
        {title}
      </Button>
    </Link>
  );
};

export default TagButton;
