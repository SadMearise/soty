import { AlertState } from "./features/alert/types";
import { AudioplayerState } from "./features/audioplayer/types";
import { FavoriteItemsState } from "./features/favoriteItems/types";
import { OAuthState } from "./features/oAuth/types";

export interface RootState {
  oAuth: OAuthState;
  audioplayer: AudioplayerState;
  alert: AlertState;
  favoriteItems: FavoriteItemsState;
}
