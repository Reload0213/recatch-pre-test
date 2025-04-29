import React from 'react';
import { Checkbox, Menu } from 'antd';

// utils
import { FilteredState, isFilterOptionSelected } from '../../../utils/recordUtils';

// types
import { Record } from '../../../types/record.d';

interface CheckboxFilterMenuProps {
    dataIndex: keyof Record;
    filteredState: FilteredState;
    onFilterChange: (dataIndex: keyof Record, value: string | boolean | number) => void;
}

// 체크박스 필터 내용 컴포넌트
export const CheckboxFilterMenu: React.FC<CheckboxFilterMenuProps> = ({ dataIndex, filteredState, onFilterChange }) => {
    const menuItems = [
        {
            key: 'true',
            label: (
                <Checkbox
                    checked={isFilterOptionSelected(dataIndex, true, filteredState)}
                    onChange={() => onFilterChange(dataIndex, true)}
                >
                    선택됨
                </Checkbox>
            ),
            style: { padding: '8px 12px', margin: 0, height: 'auto' },
        },
        {
            key: 'false',
            label: (
                <Checkbox
                    checked={isFilterOptionSelected(dataIndex, false, filteredState)}
                    onChange={() => onFilterChange(dataIndex, false)}
                >
                    선택 안함
                </Checkbox>
            ),
            style: { padding: '8px 12px', margin: 0, height: 'auto' },
        },
    ];

    return <Menu selectable={false} style={{ border: 'none', boxShadow: 'none' }} items={menuItems} />;
};

export default CheckboxFilterMenu;
