import { v4 as uuidv4 } from 'uuid';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// types
import { Record } from '../types/record.d';

export interface RecordState {
    records: Record[];
    isModalOpen: boolean;
    editingRecord: Record | null;
    addRecord: (record: Record) => void;
    updateRecord: (record: Record) => void;
    deleteRecord: (id: string) => void;
    setModalOpen: (isOpen: boolean) => void;
    setEditingRecord: (record: Record | null) => void;
}

const initialRecords: Record[] = [
    {
        id: uuidv4(),
        name: 'John Doe',
        address: '서울 강남구',
        memo: '외국인',
        joinDate: '2024-10-02',
        occupation: '개발자',
        emailConsent: true,
    },
    {
        id: uuidv4(),
        name: 'Foo Bar',
        address: '서울 서초구',
        memo: '한국인',
        joinDate: '2024-10-01',
        occupation: 'PO',
        emailConsent: false,
    },
];

const createStore: StateCreator<RecordState> = (set) => ({
    records: [],
    isModalOpen: false,
    editingRecord: null as Record | null,
    addRecord: (record) =>
        set((state) => ({
            records: [...state.records, { ...record, id: uuidv4() }],
        })),
    updateRecord: (record) =>
        set((state) => ({
            records: state.records.map((r) => (r.id === record.id ? record : r)),
        })),
    deleteRecord: (id) =>
        set((state) => ({
            records: state.records.filter((r) => r.id !== id),
        })),
    setModalOpen: (isOpen) =>
        set(() => ({
            isModalOpen: isOpen,
        })),
    setEditingRecord: (record) =>
        set(() => ({
            editingRecord: record,
        })),
});

function createRecordStore() {
    const STORAGE_TYPE = process.env.REACT_APP_STORAGE_TYPE;

    if (STORAGE_TYPE === 'local-storage') {
        return create<RecordState>()(
            persist(createStore, {
                name: 'records-storage',
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state) => {
                    if (state && state.records.length === 0) {
                        state.records = initialRecords;
                    }
                },
            })
        );
    } else if (STORAGE_TYPE === 'in-memory') {
        return create<RecordState>()((set, get, store) => ({
            ...createStore(set, get, store),
            records: initialRecords,
        }));
    }

    return create<RecordState>()((set, get, store) => ({
        ...createStore(set, get, store),
        records: initialRecords,
    }));
}

export const recordStore = createRecordStore();
