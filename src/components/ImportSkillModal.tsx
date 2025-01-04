import {Modal, Box, Typography, Button, Stack} from '@mui/material';
import { Dispatch, FC, SetStateAction} from "react";
import {handleFileChange} from "../helpers/helpers.ts";

type ImportSkillModalProps = {
    open: boolean;
    onClose: () => void;
    handleImport: () => void;
    setJsonInput: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
    error: string;
};

export const ImportSkillModal: FC<ImportSkillModalProps> = ({open, onClose, handleImport, setJsonInput, setError, error}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 1,
                    width: 400,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Import Skill Settings
                </Typography>
                <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                        handleFileChange(e, setJsonInput, setError)
                    }}
                    style={{marginBottom: '10px', display: 'block'}}
                />
                {error && (
                    <Typography color="error" mt={1}>
                        {error}
                    </Typography>
                )}
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleImport}>
                        Import
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};
