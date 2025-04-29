import React from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Card } from 'antd';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: theme.colors.primary,
                    },
                }}
            >
                <div className="App">
                    <Card title="Welcome to React">contents</Card>
                </div>
            </ConfigProvider>
        </ThemeProvider>
    );
}

export default App;
