import React from 'react';
import type { ColumnType } from 'antd/es/table';
import type { Key } from 'antd/es/table/interface';

// types
import { Record, Field } from '../types/record.d';

export interface FilteredState {
    [key: string]: (string | boolean | number)[] | null;
}

// 필터 변경 핸들러
export const handleFilterChange = (
    dataIndex: keyof Record,
    value: string | boolean | number,
    filteredState: FilteredState,
    setFilteredState: React.Dispatch<React.SetStateAction<FilteredState>>
) => {
    setFilteredState((prev) => {
        const currentValues = prev[dataIndex as string] || [];
        if (!Array.isArray(currentValues)) return prev;

        // 이미 선택된 값이면 제거
        if (currentValues.includes(value)) {
            const newValues = currentValues.filter((v) => v !== value);
            return {
                ...prev,
                [dataIndex as string]: newValues.length ? newValues : null,
            };
        }

        // 새 값 추가
        return {
            ...prev,
            [dataIndex as string]: [...currentValues, value],
        };
    });
};

// 레코드 필터링 함수
export const filterRecords = (records: Record[], filteredState: FilteredState): Record[] => {
    if (Object.keys(filteredState).length === 0) {
        return records;
    }

    return records.filter((record) => {
        return Object.entries(filteredState).every(([key, values]) => {
            // 필터 값이 없으면 모든 레코드 통과
            if (!values || values.length === 0) return true;

            const recordValue = record[key as keyof Record];
            return values.includes(recordValue as string | boolean | number);
        });
    });
};

// 필터에 표시할 옵션 생성
export const getFilterOptions = (field: Field, records: Record[]): any[] => {
    const dataIndex = field.dataIndex as keyof Record;

    if (field.type === 'checkbox') {
        return [true, false]; // 체크박스는 true/false 옵션만 있음
    } else if (field.type === 'select' && field.options) {
        return field.options;
    } else {
        // text, textarea, date 타입
        return Array.from(
            new Set(
                records
                    .map((record) => record[dataIndex])
                    .filter((value) => value !== undefined && value !== null)
                    .map((value) => String(value))
            )
        );
    }
};

// 필터 상태 확인
export const isFilterActive = (dataIndex: keyof Record, filteredState: FilteredState): boolean => {
    return Boolean(filteredState[dataIndex as string]?.length);
};

// 필터 값이 현재 선택되어 있는지 확인
export const isFilterOptionSelected = (
    dataIndex: keyof Record,
    value: string | boolean | number,
    filteredState: FilteredState
): boolean => {
    return (
        (Array.isArray(filteredState[dataIndex as string]) && filteredState[dataIndex as string]?.includes(value)) ||
        false
    );
};

// Table에 필요한 필터 속성 생성
export const createFilterProps = (
    field: Field,
    filteredState: FilteredState
): Pick<ColumnType<Record>, 'onFilter' | 'filteredValue'> => {
    const dataIndex = field.dataIndex as keyof Record;

    return {
        onFilter: (value: boolean | Key, record: Record) => {
            const recordValue = record[dataIndex];
            return recordValue === value;
        },
        filteredValue: filteredState[dataIndex as string] || null,
    };
};
