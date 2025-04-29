import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            error: string;
            warning: string;
            success: string;
            text: {
                primary: string;
                secondary: string;
            };
            background: {
                primary: string;
                secondary: string;
            };
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        breakpoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
    }
}

export const theme: DefaultTheme = {
    colors: {
        primary: '#1890ff',
        secondary: '#52c41a',
        error: '#ff4d4f',
        warning: '#faad14',
        success: '#52c41a',
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f5f5f5',
        },
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    breakpoints: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    },
};
