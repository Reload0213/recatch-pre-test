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
            border: string;
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
        borderRadius: {
            sm: string;
            md: string;
            lg: string;
        };
    }
}

export const theme: DefaultTheme = {
    colors: {
        primary: '#1677ff',
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
        border: '#d9d9d9',
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
    borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
    },
};

export type Theme = typeof theme;
