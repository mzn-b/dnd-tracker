import {FC, useState} from "react";
import {
    Typography,
    Stack,
    Button,
} from "@mui/material";
import {DEFAULT_SKILL, Skill} from "./types/types.ts";
import {handleExport, handleLongRest, handleShortRest} from "./helpers/helpers.ts";
import {SkillTable} from "./components/SkillTable.tsx";
import {ImportSkillModal} from "./components/ImportSkillModal.tsx";
import {AddSkillModal} from "./components/AddSkillModal.tsx";
import {HelpModal} from "./components/HelpModal.tsx";

const App: FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);

    const [importModalOpen, setImportModalOpen] = useState(false);
    const [addSkillModalOpen, setAddSkillModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState("");

    const [newSkill, setNewSkill] = useState<Skill>(DEFAULT_SKILL);

    const handleImport = () => {
        try {
            const parsedSkills: Skill[] = JSON.parse(jsonInput);
            setSkills(parsedSkills);
            setError("");
            setImportModalOpen(false);
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
        setNewSkill(DEFAULT_SKILL);
    };

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedSkills = [...skills];
        updatedSkills[index].expandedUses = checked ? updatedSkills[index].expandedUses + 1 : updatedSkills[index].expandedUses - 1;
        setSkills(updatedSkills);
    };

    return (
        <Stack spacing={2} sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
        }}>
            <Typography variant="h1" sx={{color: 'white'}}>DND Skill Tracker</Typography>
            <Stack sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>
                <Stack direction={'row'}>
                    <Button onClick={() => {
                        handleExport(skills)
                    }}>Export skill settings</Button>

                    <Button onClick={() => setImportModalOpen(true)}>
                        Import skill settings
                    </Button>

                    <Button onClick={() => setAddSkillModalOpen(true)}>Add a skill</Button>

                    <Button onClick={() => setHelpModalOpen(true)}>How to use</Button>
                </Stack>

                <Stack direction={'row'}>
                    <Button onClick={() => {
                        handleLongRest(skills, setSkills)
                    }}>Long Rest</Button>

                    <Button onClick={() => {
                        handleShortRest(skills, setSkills)
                    }}>
                        Short Rest
                    </Button>
                </Stack>
            </Stack>
            <SkillTable skills={skills} handleCheckboxChange={handleCheckboxChange}
                        handleRemoveSkill={handleRemoveSkill}/>

            <ImportSkillModal open={importModalOpen} onClose={() => {
                setImportModalOpen(false)
            }} handleImport={handleImport} setJsonInput={setJsonInput} setError={setError} error={error}/>

            <AddSkillModal open={addSkillModalOpen} onClose={() => {
                setAddSkillModalOpen(false)
            }} newSkill={newSkill} setNewSkill={setNewSkill} handleAddSkill={handleAddSkill}/>

            <HelpModal open={helpModalOpen} onClose={() => {
                setHelpModalOpen(false)
            }}/>
        </Stack>
    );
};

export default App;
