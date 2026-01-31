
export interface WolfData {
  id: number;
  name: string;
  revenue: number;
  percent: number;
  rank: number;
  prevPercent: number;
}

export interface GoogleSheetRow {
  c: Array<{ v: string | number | null } | null>;
}
