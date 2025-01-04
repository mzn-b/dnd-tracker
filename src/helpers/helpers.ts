import { ResetCondition, Skill } from "../types/types";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

export const getResetText = (resetCondition: ResetCondition) => {
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

export const handleExport = (skills: Skill[]) => {
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

export const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setJsonInput: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>
) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target?.result as string);
                setJsonInput(JSON.stringify(parsedData, null, 2));
                setError("");
            } catch {
                setError('Invalid JSON file');
            }
        };

        reader.readAsText(file);
    } else {
        setError('Please upload a valid JSON file.');
    }
};

export const handleLongRest = (skills: Skill[], setSkills: Dispatch<SetStateAction<Skill[]>>) => {
    handleReset(ResetCondition.LONG_REST, skills, setSkills)
}

export const handleShortRest = (skills: Skill[], setSkills: Dispatch<SetStateAction<Skill[]>>) => {
    handleReset(ResetCondition.SHORT_REST, skills, setSkills)
}

const handleReset = (condition: ResetCondition, skills: Skill[], setSkills: Dispatch<SetStateAction<Skill[]>>) => {
    const updatedSkills = skills.map(skill => {
        if (skill.resetCondition === condition || skill.resetCondition === ResetCondition.BOTH) {
            return {...skill, expandedUses: 0};
        }
        return skill;
    });
    setSkills(updatedSkills);
};