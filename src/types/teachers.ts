export type CreateTeacherRequest = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type TeacherResponse = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    classSessionCount: number;
}

export type UpdateTeacherRequest = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type TeacherSummaryResponse = {
    id: number;
    name: string;
}