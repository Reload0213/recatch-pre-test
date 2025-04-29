import { useEffect, useState, useCallback } from 'react';

import { Form, Modal, Typography, Space, Button, Divider } from 'antd';
import dayjs from 'dayjs';
import { styled } from 'styled-components';

// types
import { FIELD_CONFIGS, Record } from '../../../UserRecords/types/record.d';

// components
import RecordFormRender from '../Form/RecordFormRender';

const RecordStyledModal = styled(Modal)({
    maxWidth: '32rem',
    '.ant-modal-content': {
        padding: 0,
    },
    '.ant-modal-header': {
        padding: '12px',
        margin: '0px',
    },
    '.ant-modal-footer': {
        padding: '12px',
        margin: '0px',
    },
});

interface RecordFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Omit<Record, 'id'>) => void;
    formValues?: Record | null;
}

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
    <>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
    </>
);

const RecordFormModal = ({ isOpen, onClose, onSubmit, formValues }: RecordFormModalProps) => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);

    const handleModalClose = useCallback(() => {
        form.resetFields();
        onClose();
        setIsFormValid(false);
    }, [form, onClose, setIsFormValid]);

    const handleSubmit = useCallback(
        (values: any) => {
            const formattedValues = {
                ...values,
                joinDate: values.joinDate ? dayjs(values.joinDate).format('YYYY-MM-DD') : null,
            };
            onSubmit(formattedValues);
            handleModalClose();
            setIsFormValid(false);
        },
        [onSubmit, handleModalClose]
    );

    const handleValuesChange = useCallback(() => {
        // 필수 필드들만 검증
        const requiredFields = FIELD_CONFIGS.filter((field) => field.required).map((field) => field.dataIndex);

        if (requiredFields.length === 0) {
            setIsFormValid(true);
            return;
        }

        form.validateFields(requiredFields)
            .then(() => {
                setIsFormValid(true);
            })
            .catch((errors: { errorFields: Array<{ name: string[] }> }) => {
                // 실제 필수 필드에 대한 오류가 있는지 확인
                const hasRequiredFieldErrors = errors.errorFields.some((field) =>
                    requiredFields.includes(field.name[0])
                );
                setIsFormValid(!hasRequiredFieldErrors);
            });
    }, [form, setIsFormValid]);

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue({
                ...formValues,
                joinDate: formValues.joinDate ? dayjs(formValues.joinDate) : null,
            });
            handleValuesChange(); // 초기값이 있을 때 유효성 검사 실행
        } else {
            form.resetFields();
            setIsFormValid(false);
        }
    }, [formValues, form, handleValuesChange]);

    return (
        <RecordStyledModal
            open={isOpen}
            onCancel={handleModalClose}
            title={
                <Typography.Title level={5} style={{ margin: 0 }}>
                    {formValues ? '회원 수정' : '회원 추가'}
                </Typography.Title>
            }
            footer={
                <Space>
                    <Button onClick={handleModalClose}>취소</Button>
                    <Button type="primary" onClick={() => form.submit()} disabled={!isFormValid}>
                        저장
                    </Button>
                </Space>
            }
            width="48rem"
            centered
        >
            <Divider style={{ margin: 0 }} />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={customizeRequiredMark}
                style={{ padding: '16px' }}
                onValuesChange={handleValuesChange}
            >
                {FIELD_CONFIGS.map((field) => (
                    <RecordFormRender key={field.dataIndex} field={field} />
                ))}
            </Form>
            <Divider style={{ margin: 0 }} />
        </RecordStyledModal>
    );
};

export default RecordFormModal;
