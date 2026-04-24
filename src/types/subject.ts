export type CreateSubjectRequest = {
    name: string;
    description: string;
}

export type SubjectResponse = {
    id: number;
    name: string;
    description: string;
    classSessionCount: number;
}

export type UpdateSubjectRequest = {
    name: string;
    description: string;
}

export type SubjectSummaryResponse = {
    id: number;
    name: string;
}