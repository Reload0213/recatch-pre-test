import React from 'react';
import { Modal, Button } from 'antd';
import { styled } from 'styled-components';
import { useModal } from '../../hooks/useModal';

const ModalTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const BaseModal: React.FC = () => {
    const { isOpen, label, content, onConfirm, close } = useModal();

    const handleCancel = () => {
        close();
    };

    const handleApply = () => {
        if (onConfirm) {
            onConfirm();
        }
        close();
    };

    return (
        <Modal
            open={isOpen}
            title={<ModalTitle>{label}</ModalTitle>}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    취소
                </Button>,
                <Button key="apply" type="primary" onClick={handleApply}>
                    확인
                </Button>,
            ]}
        >
            {content}
        </Modal>
    );
};

export default BaseModal;
