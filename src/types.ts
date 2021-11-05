type PanelType = 'cableways' | 'snowmaking';

export interface PanelOptions {
  endpoint: string;
  username: string;
  password: string;
  type: PanelType;
}
