import create from "zustand";
import { ThemeProps } from "../types/themes";

type SelectedThemeDataStore = {
  selectedThemeData: ThemeProps | null;
  setSelectedThemeData: (state: ThemeProps) => void;
};

export const useSelectedThemeDataStore = create<SelectedThemeDataStore>((set) => ({
  selectedThemeData: null,
  setSelectedThemeData: (state: ThemeProps) => set({ selectedThemeData: state }),
}));
