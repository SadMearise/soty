import { AlbumType, CopyrightType, TracklistType, ReleaseDatePrecision, RestrictionsReason } from "../types/enums";

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface PaginationInfo {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restrictions {
  reason: RestrictionsReason;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface BaseInfo {
  external_urls: Partial<ExternalUrls>;
  href: string;
  id: string;
  uri: string;
}

export interface Copyright {
  text: string;
  type: CopyrightType;
}

export interface BaseArtist extends Partial<BaseInfo> {
  name: string;
  type: "artist";
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Artist extends Partial<BaseInfo> {
  followers: Partial<Followers>;
  genres: string[];
  images: Image[];
  name: string;
  popularity: string;
  type: "artist";
}

export interface Owner extends Partial<BaseInfo> {
  followers: Partial<Followers>;
  type: "user";
  display_name: string | null;
}

export interface UserProfile extends Partial<BaseInfo> {
  display_name?: string;
  followers?: Followers;
  images?: Image[];
  type?: "user";
}

export interface CurrentUserProfile extends UserProfile {
  country?: string;
  email?: string;
  explicit_content?: Partial<ExplicitContent>;
  product?: string;
}

export interface LinkedFrom extends Partial<BaseInfo> {
  type: "track";
}

export interface BaseTrack extends Partial<BaseInfo> {
  artists: Partial<BaseArtist>[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  is_playable: boolean;
  linked_from: Partial<LinkedFrom>;
  restrictions: Partial<Restrictions>;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: "track";
  is_local: boolean;
}

export interface TracksLink {
  href: string;
  total: number;
}

export interface Tracks extends PaginationInfo {
  items: Partial<BaseTrack>[];
}

export interface AlbumItem extends BaseInfo {
  album_type: AlbumType;
  total_tracks: number;
  available_markets: string[];
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  artists: Partial<BaseArtist>[];
  type: TracklistType.Album;
  restrictions?: Partial<Restrictions>;
}

export interface Albums {
  albums: PaginationInfo & {
    items: AlbumItem[];
  };
}

export interface BasePlaylist extends Partial<BaseInfo> {
  collaborative: boolean;
  description: string;
  images: Image[];
  name: string;
  owner: Partial<Owner>;
  public: boolean;
  snapshot_id: string;
  tracks: Partial<TracksLink>;
  type: TracklistType.Playlist;
}

export interface TrackObject extends Partial<Omit<BaseTrack, "artists">> {
  album: AlbumItem;
  artists: Artist[];
  external_ids: Partial<ExternalIds>;
  popularity: number;
}

export interface AddedBy extends Partial<BaseInfo> {
  type: "user";
  followers: Partial<Followers>;
}

export interface TrackItem {
  added_at: string;
  added_by: Partial<AddedBy>;
  is_local: boolean;
  track: Partial<TrackObject>;
}

export interface Playlist extends Partial<Omit<BasePlaylist, "tracks">> {
  followers?: Partial<Followers>;
  tracks?: PaginationInfo & {
    items: Partial<TrackItem>[];
  };
}

export interface PlaylistItems extends PaginationInfo {
  items: Partial<BasePlaylist>[];
}

export interface Playlists {
  message?: string;
  playlists: PlaylistItems;
}

export interface CategoryItem {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface Categories {
  categories: PaginationInfo & {
    items: CategoryItem[];
  };
}

export interface Album extends AlbumItem {
  tracks: Tracks;
  copyrights: Partial<Copyright>[];
  external_ids: Partial<ExternalIds>;
  genres: string[];
  label: string;
  popularity: number;
}

export interface ArtistAlbumsItem extends AlbumItem {
  album_group: string;
}

export interface ArtistAlbums extends PaginationInfo {
  items: ArtistAlbumsItem[];
}

export interface UserSavedTrack {
  added_at: string;
  track: Partial<TrackObject>;
}

export interface UserSavedAlbum {
  added_at: string;
  album: Album;
}

export interface UserSavedTracks extends PaginationInfo {
  items: UserSavedTrack[];
}

export interface UserSavedAlbums extends PaginationInfo {
  items: UserSavedAlbum[];
}
