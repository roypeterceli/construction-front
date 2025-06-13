export interface Module {
  id: number;
  name: string;
  path: string | string[];
  icon?: string;
  children?: Module[];
}
