export type StudentResponse = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: "IN_PROGRESS" | "COMPLETED";
    enrollmentsCount: number;
}

export type CreateStudentRequest = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

