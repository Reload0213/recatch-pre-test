export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';

export interface Field {
    type: FieldType;
    label: string;
    dataIndex: string;
    required: boolean;
    options?: string[];
}

export interface Record {
    id: string;
    name: string;
    address: string;
    memo: string;
    joinDate: string;
    occupation: string;
    emailConsent: boolean;
}

export const FIELD_CONFIGS: Field[] = [
    { type: 'text', label: '이름', dataIndex: 'name', required: true },
    { type: 'text', label: '주소', dataIndex: 'address', required: false },
    { type: 'textarea', label: '메모', dataIndex: 'memo', required: false },
    { type: 'date', label: '가입일', dataIndex: 'joinDate', required: true },
    { type: 'select', label: '직업', dataIndex: 'occupation', required: false, options: ['개발자', 'PO', '디자이너'] },
    { type: 'checkbox', label: '이메일 수신 동의', dataIndex: 'emailConsent', required: false },
];
