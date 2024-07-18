import { FC } from "react";
import { CategoryCard, SectionH3Title } from "../../components";
import { getRandomRGBColor } from "../../utils/helpers/color";
import { CategoryItem } from "../../models";

type CategoriesProps = {
  categories: CategoryItem[];
};

const classes = {
  wrapper: "mt-[32px]",
  categories: "flex flex-wrap m-[-12px] mt-[5px]",
  categoriesItem: "relative w-full md-min:w-1/2 lg-min:w-1/3 xl-min:w-1/4 p-[12px]",
};

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className={classes.wrapper}>
      <SectionH3Title title="Всё остальное" />
      <div className={classes.categories}>
        {categories.map((category, index) => (
          <div
            className={classes.categoriesItem}
            key={index}
          >
            <CategoryCard
              title={category.name}
              imageSrc={category.icons[0].url}
              color={getRandomRGBColor(undefined, undefined, 130)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
