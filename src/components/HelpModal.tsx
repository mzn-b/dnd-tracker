import {FC} from 'react';
import {Modal, Box, Typography, Button, Stack} from '@mui/material';

type HelpModalProps = {
    open: boolean;
    onClose: () => void;
};

export const HelpModal: FC<HelpModalProps> = ({open, onClose}) => {
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
                    Info
                </Typography>
                <Stack spacing={1}>
                    <Typography variant={'body2'}>
                        This website stores no user data and as such also does not store the skills automatically for
                        you.
                    </Typography>

                    <Stack>
                        <Typography variant={'body2'}> Steps to use:</Typography>
                        <Typography variant={'body2'}> 1. Add all desired skills using the "Add a skill"
                            button.</Typography>
                        <Typography variant={'body2'}>
                            2. To export the skill settings click the "Export skill settings" button. This will
                            download a JSON file to your device, you will need this file for future uses.
                        </Typography>
                        <Typography variant={'body2'}>
                            3. When you want to use the page again simply upload the previously downloaded file into the
                            "Import Skill settings" menu. This can be done on any device and allows for easy switching.
                        </Typography>
                    </Stack>

                    <Typography variant={'body2'}>
                        Clicking the "Long rest" or "Short rest" buttons will automatically reset all expanded uses with
                        that reset condition.
                    </Typography>

                    <Typography variant={'body2'}>
                        WARNING: Refreshing the page will delete your skills so make sure you save before closing or refreshing.
                    </Typography>

                    <Typography variant={'body2'}>
                        Hint: Spell slots can also be tracked using this page😉
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose}>Close</Button>
                </Stack>
            </Box>
        </Modal>
    );
};
