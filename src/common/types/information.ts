export interface FilterDataBySectionProps {
  filter: string;
}

export interface BrideDataProps {
  full_name: string | null;
  short_name: string | null;
  photo?: string | null;
  father_name?: string | null;
  mother_name?: string | null;
  family_tree?: number | null;
  instagram?: string | null;
  is_primary: boolean;
}

export interface EventDataProps {
  id?: string | null;
  name: string | null;
  date: string | null;
  start_time?: string;
  end_time?: string;
  is_until_finish: boolean;
  timezone?: string;
  location?: string;
  address: string | null;
  latitude?: string | number | undefined;
  longitude?: string | number | undefined;
  is_primary: boolean;
}
