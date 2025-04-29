import React from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';

// styles
import { theme } from '../styles/theme';

interface ProvidersProps {
    children: React.ReactNode;
}

// 전역 Provider 관리 컴포넌트

// 추후 추가될 provider 모두 아래에 추가
export default function Providers({ children }: ProvidersProps) {
    return (
        <AntdConfigProvider
            theme={{
                token: {
                    colorPrimary: theme.colors.primary,
                },
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AntdConfigProvider>
    );
}
