import {Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, FormControl, Checkbox} from "@mui/material";
import {Skill} from "../types/types";
import {getResetText} from "../helpers/helpers";
import {FC} from "react";

type SkillTableProps = {
    skills: Skill[];
    handleCheckboxChange: (index: number, checked: boolean) => void;
    handleRemoveSkill: (index: number) => void;
};

export const SkillTable: FC<SkillTableProps> = ({skills, handleCheckboxChange, handleRemoveSkill}) => {
    if(skills.length === 0){
        return null;
    }

    return (
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
                                {Array.from({length: skill.uses}, (_, i) => (
                                    <FormControl
                                        key={i}>
                                        <Checkbox
                                            checked={i < skill.expandedUses}
                                            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                        />
                                    </FormControl>
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
    );
};
