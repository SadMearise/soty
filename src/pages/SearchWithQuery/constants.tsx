import { FiltersType } from "./Filters";
import { FilterNames } from "./enums";

export const CATEGORY_FILTERS: FiltersType[] = [
  { title: "Все", path: "", name: FilterNames.All },
  { title: "Альбомы", path: "/albums", name: FilterNames.Albums },
  { title: "Плейлисты", path: "/playlists", name: FilterNames.Playlists },
];
