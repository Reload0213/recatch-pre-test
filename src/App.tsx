// providers
import Providers from './providers';
// pages
import UserRecords from './pages/UserRecords';
// components
import BaseModal from './components/Modal/BaseModal';
// hooks
import { useModal } from './hooks/useModal';

function App() {
    const { isOpen } = useModal();

    return (
        <Providers>
            <UserRecords />
            {isOpen && <BaseModal />}
        </Providers>
    );
}

export default App;
