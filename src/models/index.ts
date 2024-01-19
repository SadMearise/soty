export interface ClientData {
  clientSecret: string;
  clientId: string;
  scope: string;
}

export interface PaginationInfo {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface Restrictions {
  reason: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface User {
  country?: string;
  display_name: string;
  email?: string;
  explicit_content?: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface ProfileMenuItem {
  name: string;
  href?: string;
  onClick?: () => void;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
export interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface AlbumItem {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

export interface FeaturedPlaylists {
  message: string;
  playlists: PaginationInfo & {
    items: PlaylistItem[];
  };
}

export interface NewReleases {
  album: PaginationInfo & {
    items: AlbumItem[];
  };
}
