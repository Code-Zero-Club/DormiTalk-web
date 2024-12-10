import { create } from 'zustand';

type SaveAction = (() => Promise<void>) | null;

interface SaveDrawerStore {
  saveAction: SaveAction;
  setSaveAction: (action: SaveAction) => void;
}

export const useSaveDrawer = create<SaveDrawerStore>((set) => ({
  saveAction: null,
  setSaveAction: (newAction) => set({ saveAction: newAction }),
}));