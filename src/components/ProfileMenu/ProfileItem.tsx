import { FC } from "react";
import { Button } from "..";

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
      <Button
        as="link"
        styles={classes.item}
        href={href}
      >
        {name}
      </Button>
    );
  }

  return (
    <Button
      as="button"
      styles={classes.item}
      aria-label={name}
      type="button"
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default ProfileItem;
