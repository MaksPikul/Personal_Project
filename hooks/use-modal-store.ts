import { Project } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "CreateBoard" | "signOut" | "invite" | 
"LeaveProject" | "DeleteProject";

interface ModalData {
    project?: Project
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({ type: null, isOpen: false})
}));