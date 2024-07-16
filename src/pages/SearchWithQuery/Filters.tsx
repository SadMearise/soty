import { Dispatch, FC, SetStateAction } from "react";
import { TagButton } from "../../components";
import { LINKS } from "../../utils/constants";
import { FilterNames } from "./enums";

export type FiltersType = {
  title: string;
  path: string;
  name: FilterNames;
};

type FiltersProps = {
  filters: FiltersType[];
  activeFilter: FilterNames;
  setActiveFilter: Dispatch<SetStateAction<FilterNames>>;
  query?: string;
};

const classes = {
  filters: "flex flex-wrap items-center gap-[8px] mt-[7px]",
  filterItem: "inline-block",
};

const Filters: FC<FiltersProps> = ({ filters, query, activeFilter, setActiveFilter }) => {
  return (
    <div className={classes.filters}>
      {filters.map((filter, index) => {
        return (
          query && (
            <div
              className={classes.filterItem}
              key={index}
            >
              <TagButton
                to={`/${LINKS.search.route}/${query}${filter.path}`}
                title={filter.title}
                isActive={filter.name === activeFilter}
                onClick={() => setActiveFilter(filter.name)}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

export default Filters;
