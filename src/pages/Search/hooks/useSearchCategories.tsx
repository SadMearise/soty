import { useEffect, useState } from "react";
import { CategoryItem } from "../../../models";
import { LINKS } from "../../../utils/constants";
import { fetchCategories } from "../../../services";

const useSearchCategories = (locationPathname: string) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCategories();

        setCategories(response.categories.items);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      }

      setIsLoading(false);
    };

    if (locationPathname === `/${LINKS.search.route}`) {
      fetchData();
    }
  }, [locationPathname]);

  return { categories, isLoading, isError };
};

export default useSearchCategories;
