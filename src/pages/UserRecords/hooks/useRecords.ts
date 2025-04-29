import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { recordStore } from '../store/recordStore';
import { Record } from '../types/record.d';

export function useRecords() {
    const { records, isModalOpen, editingRecord } = recordStore();

    const addRecord = useCallback((record: Record) => {
        recordStore.setState((state) => ({
            records: [...state.records, { ...record, id: uuidv4() }],
        }));
    }, []);

    const updateRecord = useCallback((record: Record) => {
        recordStore.setState((state) => ({
            records: state.records.map((r) => (r.id === record.id ? record : r)),
        }));
    }, []);

    const deleteRecord = useCallback((id: string) => {
        recordStore.setState((state) => ({
            records: state.records.filter((r) => r.id !== id),
        }));
    }, []);

    const setModalOpen = useCallback((isOpen: boolean) => {
        recordStore.setState({
            isModalOpen: isOpen,
        });
    }, []);

    const setEditingRecord = useCallback((record: Record | null) => {
        recordStore.setState({
            editingRecord: record,
        });
    }, []);

    const openModal = useCallback(() => {
        setEditingRecord(null);
        setModalOpen(true);
    }, [setEditingRecord, setModalOpen]);

    const closeModal = useCallback(() => {
        setEditingRecord(null);
        setModalOpen(false);
    }, [setEditingRecord, setModalOpen]);

    const handleEditRecord = useCallback(
        (record: Record) => {
            setEditingRecord(record);
            setModalOpen(true);
        },
        [setEditingRecord, setModalOpen]
    );

    return {
        records,
        isModalOpen,
        editingRecord,
        openModal,
        closeModal,
        editRecord: handleEditRecord,
        addRecord,
        updateRecord,
        deleteRecord,
    };
}
