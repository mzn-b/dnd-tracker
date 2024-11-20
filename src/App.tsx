import React, {useState} from "react";
import {
    Typography,
    Stack,
    Button,
    Checkbox,
    TextField,
    Modal,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl, Table, TableHead, TableRow, TableCell, TableBody,
} from "@mui/material";

enum ResetCondition {
    LONG_REST,
    SHORT_REST,
    BOTH,
}

type Skill = {
    name: string;
    uses: number;
    resetCondition: ResetCondition;
};

const App: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);

    const [importModalOpen, setImportModalOpen] = useState(false);
    const [addSkillModalOpen, setAddSkillModalOpen] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState("");

    const [newSkill, setNewSkill] = useState<Skill>({
        name: "",
        uses: 0,
        resetCondition: ResetCondition.LONG_REST,
    });

    const getResetText = (resetCondition: ResetCondition) => {
        switch (resetCondition) {
            case ResetCondition.LONG_REST:
                return "Long Rest";
            case ResetCondition.SHORT_REST:
                return "Short Rest";
            case ResetCondition.BOTH:
                return "Long or Short Rest (Both)";
            default:
                return "";
        }
    };

    const handleExport = () => {
        const json = JSON.stringify(skills, null, 2);
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "skills.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        try {
            const parsedSkills: Skill[] = JSON.parse(jsonInput);
            if (
                parsedSkills.every(
                    (skill) =>
                        Object.values(ResetCondition).includes(skill.resetCondition)
                )
            ) {
                setSkills(parsedSkills);
                setError("");
                setImportModalOpen(false);
            } else {
                setError("Invalid JSON format. Ensure it matches the Skill type.");
            }
        } catch (err) {
            console.error(err);
            setError("Invalid JSON input. Please check your data.");
        }
    };

    const handleRemoveSkill = (index: number) => {
        setSkills((skills) => {
            const updatedSkills = [...skills];
            updatedSkills.splice(index, 1);
            return updatedSkills;
        });
    };

    const handleAddSkill = () => {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
        setAddSkillModalOpen(false);
        setNewSkill({name: "", uses: 0, resetCondition: ResetCondition.LONG_REST});
    };

    return (
        <Stack spacing={2} sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
        }}>
            <Stack direction={'row'} spacing={12}><Typography variant="h1">DND Tracker</Typography>
                <Stack>
                    <Button onClick={handleExport}>Export skill settings</Button>

                    <Button onClick={() => setImportModalOpen(true)}>
                        Import skill settings
                    </Button>

                    <Button onClick={() => setAddSkillModalOpen(true)}>Add a skill</Button>
                </Stack></Stack>
            <Table sx={{
                width: '60%',
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Uses</TableCell>
                        <TableCell>Reset Condition</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {skills.map((skill, index) => (
                        <TableRow>
                            <TableCell>{skill.name}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {Array.from({length: skill.uses}).map((_, checkboxIndex) => (
                                        <Checkbox sx={{color: 'white'}} key={checkboxIndex}/>
                                    ))}
                                </Stack></TableCell>
                            <TableCell>{getResetText(skill.resetCondition)}</TableCell>
                            <TableCell>
                                <Button onClick={() => {
                                    handleRemoveSkill(index)
                                }}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal for JSON Input */}
            <Modal open={importModalOpen} onClose={() => setImportModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 1,
                        width: 400,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Import Skill Settings
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder='Paste JSON here, e.g., [{"name":"Skill Name","uses":3,"resetCondition":0}]'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" mt={1}>
                            {error}
                        </Typography>
                    )}
                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                        <Button onClick={() => setImportModalOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleImport}>
                            Import
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            {/* Modal for Adding a Skill */}
            <Modal open={addSkillModalOpen} onClose={() => setAddSkillModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
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
                            value={newSkill.uses}
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
                                variant={'filled'}>
                                <MenuItem value={ResetCondition.LONG_REST}>Long Rest</MenuItem>
                                <MenuItem value={ResetCondition.SHORT_REST}>Short Rest</MenuItem>
                                <MenuItem value={ResetCondition.BOTH}>
                                    Long or Short Rest (Both)
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                        <Button onClick={() => setAddSkillModalOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddSkill}>
                            Add Skill
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>
    );
};

export default App;
