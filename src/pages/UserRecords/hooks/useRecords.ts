import { useCallback } from 'react';

import { recordStore } from '../store/recordStore';
import { Record } from '../types/record.d';

export function useRecords() {
    const records = recordStore((state) => state.records);
    const isModalOpen = recordStore((state) => state.isModalOpen);
    const editingRecord = recordStore((state) => state.editingRecord);

    const addRecord = recordStore((state) => state.addRecord);
    const updateRecord = recordStore((state) => state.updateRecord);
    const deleteRecord = recordStore((state) => state.deleteRecord);
    const setModalOpen = recordStore((state) => state.setModalOpen);
    const setEditingRecord = recordStore((state) => state.setEditingRecord);

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

    const handleAddRecord = useCallback(
        (record: Record) => {
            addRecord(record);
        },
        [addRecord]
    );

    const handleUpdateRecord = useCallback(
        (record: Record) => {
            updateRecord(record);
        },
        [updateRecord]
    );

    const handleDeleteRecord = useCallback(
        (id: string) => {
            deleteRecord(id);
        },
        [deleteRecord]
    );

    return {
        records,
        isModalOpen,
        editingRecord,
        openModal,
        closeModal,
        editRecord: handleEditRecord,
        addRecord: handleAddRecord,
        updateRecord: handleUpdateRecord,
        deleteRecord: handleDeleteRecord,
    };
}
