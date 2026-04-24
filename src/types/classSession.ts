import type { SubjectSummaryResponse } from "./subject";
import type { TeacherSummaryResponse } from "./teachers";

export type CreateClassSessionRequest = {
    title: string;
    subjectId: number | string;
    initialDate: string;
    finalDate: string;
    teacherId: number | string;
}

export type ClassSessionResponse = {
    id: number;
    title: string;
    subject: SubjectSummaryResponse;
    initialDate: string;
    finalDate: string;
    teacher: TeacherSummaryResponse;
    enrollmentsCount: number;
}

export type UpdateClassSessionRequest = {
    title: string;
    subjectId: number | string;
    initialDate: string;
    finalDate: string;
    teacherId: number | string;
}

export type ClassSessionSummaryResponse = {
    id: number;
    name: string;
}