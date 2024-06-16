import { useEffect } from "react";

const useTitle = (title: string | null) => {
  useEffect(() => {
    if (!title) return;

    document.title = title;
  }, [title]);
};

export default useTitle;
