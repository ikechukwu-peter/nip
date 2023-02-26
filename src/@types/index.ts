export interface ICreateShortType {
  originalUrl: string;
  customUrl?: string;
  password?: string;
  expiresAt?: Date | string;
}

export interface ICreateShortResponseType {
  url: string;
  qr: string;
}

export interface VERIFICATION_RESPONSE {
  token: string;
}

export interface IPAYLOAD {
  email: string;
}
export interface AUTH_TYPE {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onLogin: (payload: IPAYLOAD) => void;
  onLogout: () => void;
}

export interface StatsType {
  resource: {
    totalClicks: number;
    highestClicked: string;
    lowestClicked: string;
    highestClicks?: number;
    lowestClicks?: number;
    urls: URLType;
  };
}

interface URLType {
  urls: string[];
  clicks: number[];
}

export interface IURLTYPE {
  createdAt: string;
  id: string;
  url: string;
  clicks: number;
}

export interface IURLSTYPE extends Omit<IURLTYPE, "url"> {
  expiresAt: string;
  isPasswordEnabled: boolean;
  qr: string;
  shortUrl: string
}
