import { create } from 'zustand';

type ModalState = {
    isOpen: boolean;
    label: string;
    content: React.ReactNode;
    onConfirm: (() => void) | undefined;
};

export const modalStore = create<ModalState>(() => ({
    isOpen: false,
    label: '',
    content: null,
    onConfirm: undefined,
}));
