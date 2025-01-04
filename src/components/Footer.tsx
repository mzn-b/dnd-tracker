import {FC} from "react";
import {Stack} from "@mui/material";

export const Footer: FC = () => {
    return <Stack direction={'row'} spacing={2}>
        <a href="https://github.com/mzn-b/dnd-tracker" target="_blank" rel="noopener noreferrer">
            <img
                src="/github-mark-white.svg"
                alt="Source code"
                title="Source code"
                style={{cursor: 'pointer', width: '25px', height: 'auto'}}
            />
        </a>
    </Stack>
}