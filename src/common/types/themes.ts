export interface ThemeProps {
  id: number;
  image: string;
  name: string;
  initial_price: number | null;
  price: number;
  tag: string | null;
  package_id: number
}

export interface PackageProps {
  id: number;
  name: string;
  themes: ThemeProps[];
}

export interface ThemeCarouselProps {
  className?: string;
  themes: ThemeProps[];
  package_id: number
}

export interface ThemeSelectProps {
  package_id: string,
  theme_id: string,
}