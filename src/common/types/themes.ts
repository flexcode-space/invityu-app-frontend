export interface ThemeProps {
  id: string;
  image: string;
  name: string;
  description: string;
  initial_price: number | null;
  price: number;
  tag: string | null;
  package_id: string;
  viewOptions: string;
  isGridView?: boolean;
  isListView?: boolean;
  isAnimation?: boolean;
}

export interface PackageProps {
  id: string;
  name: string;
  themes: ThemeProps[];
}

export interface ThemeCarouselProps {
  className?: string;
  themes: ThemeProps[];
  package_id: string
}

export interface ThemeSelectProps {
  package_id: string,
  theme_id: string,
}