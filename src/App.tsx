import { Button } from 'antd';
import { styled } from 'styled-components';

import RecordTable from './components/RecordTable';
import Providers from './providers';

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
`;

function AppContent() {
    return (
        <Container>
            <Header>
                <Title>회원 관리</Title>
                <Button type="primary">추가</Button>
            </Header>
            <RecordTable />
        </Container>
    );
}

function App() {
    return (
        <Providers>
            <AppContent />
        </Providers>
    );
}

export default App;
