import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

// components
import RecordTable from './components/Table/RecordTable';
import RecordFormModal from './components/Modal/RecordFormModal';

// hooks
import { useRecords } from './hooks/useRecords';

const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
`;

const UserRecords = () => {
    const { isModalOpen, editingRecord, openModal, closeModal, addRecord, updateRecord } = useRecords();

    const handleSubmit = async (values: any) => {
        try {
            if (editingRecord) {
                updateRecord({ ...values, id: editingRecord.id });
            } else {
                addRecord(values);
            }
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container>
            <Header>
                <Title>회원 목록</Title>
                <Button type="primary" onClick={openModal}>
                    <PlusOutlined />
                    추가
                </Button>
            </Header>
            <RecordTable />
            <RecordFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                formValues={editingRecord}
            />
        </Container>
    );
};

export default UserRecords;
