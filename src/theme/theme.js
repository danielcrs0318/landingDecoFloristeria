import { createTheme } from '@mui/material/styles';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';

const theme = createTheme({
    palette: {
        primary: {
            light: '#E8C5C5',
            main: '#D4A5A5',
            dark: '#C49090',
        },
        secondary: {
            main: '#7A9E7E',
        },
        background: {
            default: '#FDF8F3',
            paper: '#FFFBF7',
            dark: '#2D2D2D',
        },
        text: {
            primary: '#2D2D2D',
            secondary: '#5a5a5a',
        },
    },
    typography: {
        fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#2D2D2D',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        },
        h3: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
        },
        h4: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
        },
        h5: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
        },
        h6: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(212, 165, 165, 0.4)',
                    },
                },
                containedPrimary: {
                    color: '#2D2D2D', // To ensure contrast
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 8px 24px rgba(45, 45, 45, 0.04)',
                },
            },
        },
    },
});

export default theme;