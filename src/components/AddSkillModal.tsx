import {Dispatch, FC, SetStateAction} from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {ResetCondition, Skill} from "../types/types.ts";

type AddSkillModalProps = {
    open: boolean;
    onClose: () => void;
    newSkill: Skill;
    setNewSkill: Dispatch<SetStateAction<Skill>>;
    handleAddSkill: () => void;
};

export const AddSkillModal: FC<AddSkillModalProps> = ({open, onClose, newSkill, setNewSkill, handleAddSkill}) => {
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
                    Add a New Skill
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Skill Name"
                        fullWidth
                        value={newSkill.name}
                        onChange={(e) =>
                            setNewSkill((prev) => ({...prev, name: e.target.value}))
                        }
                    />
                    <TextField
                        label="Number of Uses"
                        type="number"
                        fullWidth
                        value={newSkill.uses === 0 ? '' : newSkill.uses}
                        onChange={(e) =>
                            setNewSkill((prev) => ({
                                ...prev,
                                uses: Number(e.target.value),
                            }))
                        }
                    />
                    <FormControl fullWidth>
                        <InputLabel>Reset Condition</InputLabel>
                        <Select
                            value={newSkill.resetCondition}
                            onChange={(e) =>
                                setNewSkill((prev) => ({
                                    ...prev,
                                    resetCondition: e.target.value as ResetCondition,
                                }))
                            }
                            variant={'filled'}
                        >
                            <MenuItem value={ResetCondition.LONG_REST}>Long Rest</MenuItem>
                            <MenuItem value={ResetCondition.SHORT_REST}>Short Rest</MenuItem>
                            <MenuItem value={ResetCondition.BOTH}>
                                Long or Short Rest (Both)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddSkill}>
                        Add Skill
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};
