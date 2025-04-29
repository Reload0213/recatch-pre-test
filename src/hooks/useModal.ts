import { useCallback } from 'react';
import { modalStore } from '../store/modalStore';

export type ModalOptions = {
    label: string;
    content: React.ReactNode;
    onConfirm?: () => void;
};

export const useModal = () => {
    const { label, content, isOpen, onConfirm } = modalStore();

    const handleOpenModal = useCallback((options: ModalOptions) => {
        modalStore.setState({
            isOpen: true,
            label: options.label,
            content: options.content,
            onConfirm: options.onConfirm,
        });
    }, []);

    const handleCloseModal = useCallback(() => {
        modalStore.setState({
            isOpen: false,
            label: '',
            content: null,
            onConfirm: undefined,
        });
    }, []);

    return {
        isOpen,
        open: handleOpenModal,
        close: handleCloseModal,
        label,
        content,
        onConfirm,
    };
};
