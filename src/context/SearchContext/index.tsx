import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useMemo, useState } from "react";
import { Playlists, Albums } from "../../models";

type SearchContextValue = {
  searchResults: (Playlists & Albums) | null;
  setSearchResults: Dispatch<SetStateAction<(Playlists & Albums) | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: string | null;
  setIsError: Dispatch<SetStateAction<string | null>>;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<(Playlists & Albums) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  const value = useMemo(
    () => ({ searchResults, setSearchResults, isLoading, setIsLoading, isError, setIsError }),
    [searchResults, setSearchResults, isLoading, setIsLoading, isError, setIsError]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};