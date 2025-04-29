import { MoreOutlined } from '@ant-design/icons';
import { Table, Space, Button, Popover } from 'antd';
import { styled } from 'styled-components';

import { Record, FIELD_CONFIGS } from '../types/record.d';

import type { ColumnsType } from 'antd/es/table';

const ActionButton = styled(Button)`
    padding: 0 4px;
    &:hover {
        background: transparent;
    }
`;

const initialRecords: Record[] = [
    {
        id: '1',
        name: 'John Doe',
        address: '서울 강남구',
        memo: '외국인',
        joinDate: '2024-10-02',
        occupation: '개발자',
        emailConsent: true,
    },
    {
        id: '2',
        name: 'Foo Bar',
        address: '서울 서초구',
        memo: '한국인',
        joinDate: '2024-10-01',
        occupation: 'PO',
        emailConsent: false,
    },
];

const RecordTable = () => {
    const columns: ColumnsType<Record> = [
        ...FIELD_CONFIGS.map((field) => ({
            title: field.label,
            dataIndex: field.dataIndex,
            key: field.label,
        })),
        {
            key: 'RecordAction',
            width: 50,
            render: () => (
                <Popover
                    content={
                        <Space direction="vertical">
                            <Button type="text">수정</Button>
                            <Button type="text" danger>
                                삭제
                            </Button>
                        </Space>
                    }
                    trigger="click"
                    placement="bottomRight"
                >
                    <ActionButton type="text" icon={<MoreOutlined />} />
                </Popover>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={initialRecords} rowKey="id" />
        </>
    );
};

export default RecordTable;
