import React from 'react';
import { Checkbox, Menu } from 'antd';

// utils
import { FilteredState, isFilterOptionSelected } from '../../../utils/recordUtils';

// types
import { Record } from '../../../types/record.d';

interface OptionsFilterMenuProps {
    dataIndex: keyof Record;
    options: any[];
    filteredState: FilteredState;
    onFilterChange: (dataIndex: keyof Record, value: string | boolean | number) => void;
}

// 옵션 목록 필터 내용 컴포넌트
export const OptionsFilterMenu: React.FC<OptionsFilterMenuProps> = ({
    dataIndex,
    options,
    filteredState,
    onFilterChange,
}) => {
    const menuItems = options.map((option, idx) => ({
        key: idx.toString(),
        label: (
            <Checkbox
                checked={isFilterOptionSelected(dataIndex, option, filteredState)}
                onChange={() => onFilterChange(dataIndex, option)}
            >
                {String(option)}
            </Checkbox>
        ),
        style: { padding: '8px 12px', margin: 0, height: 'auto' },
    }));

    return <Menu selectable={false} style={{ border: 'none', boxShadow: 'none' }} items={menuItems} />;
};

export default OptionsFilterMenu;
