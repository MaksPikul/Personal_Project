import { create } from "zustand"

export type EditingType = "taskTitle" | "listTitle"

interface EditingData {
    title?: string
    index?: number
}

interface EditingStore {
    type: EditingType | null;
    editingIndex: number
    isEditing: boolean;
    editingData: EditingData
    setEditingData: (data: EditingData) => void
    enableEditing: (type: EditingType, data?: EditingData, editingIndex?: number) => void;
    disableEditing: () => void;
}

export const useEditing = create<EditingStore>((set) => ({
    type: null,
    editingIndex:0,
    editingData: {},
    isEditing: false,
    setEditingData: (editingData = {}) => set({editingData}),
    enableEditing: (type, editingData = {}) => set({isEditing: true, type, editingData}),
    disableEditing: () => set({ type: null, isEditing: false})
}));