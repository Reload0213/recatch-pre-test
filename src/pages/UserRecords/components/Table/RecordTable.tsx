import { useCallback, useState, useMemo } from 'react';
import { Table, Space, Button, Popover, Checkbox } from 'antd';
import { FilterFilled, MoreOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

// hooks
import { useRecords } from '../../hooks/useRecords';
import { useModal } from '../../../../hooks/useModal';

// types
import { Record, FIELD_CONFIGS } from '../../types/record.d';

// utils
import {
    FilteredState,
    handleFilterChange,
    filterRecords,
    getFilterOptions,
    isFilterActive,
    createFilterProps,
} from '../../utils/recordUtils';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import { OptionsFilterMenu } from './FilterMenu/OptionsFilterMenu';
import { CheckboxFilterMenu } from './FilterMenu/CheckboxFilterMenu';

// 필터 아이콘 컴포넌트
export const FilterIcon: React.FC<{ isFiltered: boolean }> = ({ isFiltered }) => {
    return <FilterFilled style={{ color: isFiltered ? '#1890ff' : undefined }} />;
};

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
    const { open: openModal } = useModal();
    const { records, editRecord, deleteRecord } = useRecords();

    const [popoverOpen, setPopoverOpen] = useState<string | null>(null);
    const [filteredState, setFilteredState] = useState<FilteredState>({});

    const handleEdit = useCallback(
        (record: Record) => {
            setPopoverOpen(null);
            editRecord(record);
        },
        [editRecord]
    );

    const handleDelete = useCallback(
        (id: string) => {
            deleteRecord(id);
        },
        [deleteRecord]
    );

    // 필터 변경 처리 함수
    const onFilterChange = useCallback(
        (dataIndex: keyof Record, value: string | boolean | number) => {
            handleFilterChange(dataIndex, value, filteredState, setFilteredState);
        },
        [filteredState]
    );

    // 필터링된 레코드
    const filteredRecords = useMemo(() => filterRecords(records, filteredState), [records, filteredState]);

    // 컬럼 생성
    const columns: ColumnsType<Record> = useMemo(
        () => [
            ...FIELD_CONFIGS.map((field) => {
                const columnBase: ColumnType<Record> = {
                    title: field.label,
                    dataIndex: field.dataIndex,
                    key: field.label,
                };

                const isFiltered = isFilterActive(field.dataIndex as keyof Record, filteredState);
                const options = getFilterOptions(field, records);

                // 체크박스 타입인 경우 render 설정
                if (field.type === 'checkbox') {
                    return {
                        ...columnBase,
                        render: (checked: boolean) => <TableViewCheckbox checked={checked} disabled />,
                        filterDropdown: () => (
                            <CheckboxFilterMenu
                                dataIndex={field.dataIndex as keyof Record}
                                filteredState={filteredState}
                                onFilterChange={onFilterChange}
                            />
                        ),
                        filterIcon: () => <FilterIcon isFiltered={isFiltered} />,
                        ...createFilterProps(field, filteredState),
                    };
                }

                // 그 외 타입에 필터 추가
                return {
                    ...columnBase,
                    filterDropdown: () => (
                        <OptionsFilterMenu
                            dataIndex={field.dataIndex as keyof Record}
                            options={options}
                            filteredState={filteredState}
                            onFilterChange={onFilterChange}
                        />
                    ),
                    filterIcon: () => <FilterIcon isFiltered={isFiltered} />,
                    ...createFilterProps(field, filteredState),
                };
            }),
            {
                key: 'RecordAction',
                width: 50,
                render: (record: Record) => (
                    <Popover
                        content={
                            <Space style={{ width: 140 }} direction="vertical">
                                <Button
                                    style={{ width: '100%', justifyContent: 'left' }}
                                    type="text"
                                    onClick={() => handleEdit(record)}
                                >
                                    수정
                                </Button>
                                <Button
                                    style={{ width: '100%', justifyContent: 'left' }}
                                    type="text"
                                    danger
                                    onClick={() => {
                                        openModal({
                                            label: '삭제 확인',
                                            content: '정말로 삭제하시겠습니까?',
                                            onConfirm: () => handleDelete(record.id),
                                        });
                                        setPopoverOpen(null);
                                    }}
                                >
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
        ],
        [filteredState, records, onFilterChange, popoverOpen, handleEdit, openModal, handleDelete]
    );

    return <Table columns={columns} dataSource={filteredRecords} rowKey="id" pagination={{ pageSize: 10 }} />;
};

export default RecordTable;
