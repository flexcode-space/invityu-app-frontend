export interface ThemeProps {
  id: number;
  image: string;
  title: string;
  initial_price: number | null;
  price: number;
  tag: string | null;
}

export interface PackageProps {
  id: number;
  name: string;
  themes: ThemeProps[];
}