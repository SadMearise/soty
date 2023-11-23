import { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

type LinkButtonProps = {
  href: string;
  styles?: string;
  isLink?: boolean;
} & (LinkProps | AnchorHTMLAttributes<HTMLAnchorElement>);

const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({ children, href, styles, isLink = true, ...props }) => {
  return isLink ? (
    <Link
      to={href}
      className={styles}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <a
      href={href}
      className={styles}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkButton;
