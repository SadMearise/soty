import { FC } from "react";
import BaseButton from "./BaseButton";
import LinkButton from "./LinkButton";

type ProfileItemProps = {
  name: string;
  href?: string;
  onClick?: () => void;
};

const classes = {
  item: "py-3 pr-2 pl-3 text-left rounded-sm hover:bg-white/10",
};

const ProfileItem: FC<ProfileItemProps> = ({ name, href, onClick }) => {
  if (href) {
    return (
      <LinkButton
        className={classes.item}
        href={href}
      >
        {name}
      </LinkButton>
    );
  }

  return (
    <BaseButton
      className={classes.item}
      label={name}
      onClick={onClick}
    >
      {name}
    </BaseButton>
  );
};

export default ProfileItem;
