export interface ClientData {
  clientSecret: string;
  clientId: string;
  scope: string;
}

export interface User {
  country?: string;
  display_name: string;
  email?: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
  ];
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
