import { useCallback, useState } from 'react';
import { Table, Space, Button, Popover, Checkbox } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

// hooks
import { useRecords } from '../../hooks/useRecords';

// types
import { Record, FIELD_CONFIGS } from '../../types/record.d';

import type { ColumnsType } from 'antd/es/table';

const ActionButton = styled(Button)({
    padding: '0 4px',
    '&:hover': {
        background: 'transparent',
    },
});

const TableViewCheckbox = styled(Checkbox)(({ theme }) => ({
    '& .ant-checkbox-checked .ant-checkbox-inner': {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    '& .ant-checkbox-checked .ant-checkbox-inner::after': {
        borderColor: '#fff',
    },
    cursor: 'default',
}));

const RecordTable = () => {
    const { records, editRecord, deleteRecord } = useRecords();
    const [popoverOpen, setPopoverOpen] = useState<string | null>(null);

    const handleEdit = useCallback(
        (record: Record) => {
            setPopoverOpen(null);
            editRecord(record);
        },
        [editRecord]
    );

    const handleDelete = (id: string) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            setPopoverOpen(null);
            deleteRecord(id);
        }
    };

    const columns: ColumnsType<Record> = [
        ...FIELD_CONFIGS.map((field) => {
            if (field.type === 'checkbox') {
                return {
                    title: field.label,
                    dataIndex: field.dataIndex,
                    key: field.label,
                    render: (checked: boolean) => <TableViewCheckbox checked={checked} disabled />,
                };
            }
            return {
                title: field.label,
                dataIndex: field.dataIndex,
                key: field.label,
            };
        }),
        {
            key: 'RecordAction',
            width: 50,
            render: (_, record) => (
                <Popover
                    content={
                        <Space direction="vertical">
                            <Button type="text" onClick={() => handleEdit(record)}>
                                수정
                            </Button>
                            <Button type="text" danger onClick={() => handleDelete(record.id)}>
                                삭제
                            </Button>
                        </Space>
                    }
                    trigger="click"
                    placement="bottomRight"
                    open={popoverOpen === record.id}
                    onOpenChange={(visible) => setPopoverOpen(visible ? record.id : null)}
                >
                    <ActionButton type="text" icon={<MoreOutlined />} />
                </Popover>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={records} rowKey="id" />
        </>
    );
};

export default RecordTable;
