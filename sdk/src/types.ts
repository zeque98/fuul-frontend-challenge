export interface ProjectInfo {
  apiKey: string;
  id: string;
  name: string;
  description: string;
  trackingLink: string;
  connectedAddress: string;
}

// Extendable interface for more dynamic data
export interface GenericProjectInfo extends ProjectInfo {
  [key: string]: any;
}
