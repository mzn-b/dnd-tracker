export enum ResetCondition {
    LONG_REST,
    SHORT_REST,
    BOTH,
}

export type Skill = {
    name: string;
    uses: number;
    expandedUses: number;
    resetCondition: ResetCondition;
};

export const DEFAULT_SKILL: Skill = {
    name: "",
    uses: 0,
    expandedUses: 0,
    resetCondition: ResetCondition.LONG_REST,
};
