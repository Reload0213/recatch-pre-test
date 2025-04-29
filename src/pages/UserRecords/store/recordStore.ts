import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// types
import { Record } from '../types/record.d';

export interface RecordState {
    records: Record[];
    isModalOpen: boolean;
    editingRecord: Record | null;
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

const initialState: RecordState = {
    records: initialRecords,
    isModalOpen: false,
    editingRecord: null,
};

function createRecordStore() {
    const STORAGE_TYPE = process.env.REACT_APP_STORAGE_TYPE;

    if (STORAGE_TYPE === 'local-storage') {
        return create<RecordState>()(
            persist(() => initialState, {
                name: 'records-storage',
                storage: createJSONStorage(() => localStorage),
            })
        );
    } else {
        return create<RecordState>()(() => initialState);
    }
}

export const recordStore = createRecordStore();
