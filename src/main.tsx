import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: "white", // Global text color for all table cells
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "black"
                }
            }
        }
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
