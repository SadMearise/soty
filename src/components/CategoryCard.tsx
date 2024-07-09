import { FC } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../utils/constants";

type CategoryCardProps = {
  title: string;
  imageSrc: string;
  color: string;
};

const CategoryCard: FC<CategoryCardProps> = ({ title, imageSrc, color }) => {
  const classes = {
    article: "relative w-full h-full pb-[56.25%] rounded-[8px] overflow-hidden",
    articleImg:
      "absolute w-[45%] bottom-0 right-0 object-cover rounded-[8px] rotate-[25deg] translate-x-[18%] translate-y-[2%]",
    articleTitle: "absolute top-0 left-0 p-[16px] truncate",
    articleLink: "absolute w-full h-full top-0 left-0",
  };

  return (
    <article
      className={classes.article}
      style={{ backgroundColor: color }}
    >
      <img
        src={imageSrc}
        alt={title}
        className={classes.articleImg}
      />
      <span className={classes.articleTitle}>{title}</span>
      <Link
        to={`/${LINKS.contentRestricted.route}`}
        className={classes.articleLink}
      />
    </article>
  );
};

export default CategoryCard;
