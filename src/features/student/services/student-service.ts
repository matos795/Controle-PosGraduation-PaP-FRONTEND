import { api } from "../../../utils/api.ts"
import type { PageResponse } from "../../../types/PageResponse.ts";
import type { StudentResponse, CreateStudentRequest } from "../types/student.ts"

export async function getStudents(params: {
    page: number;
    size: number;
    name?: string;
    status?: string;
    sortBy?: string;
    sortDir?: string;
}): Promise<PageResponse<StudentResponse>> {
    const response = await api.get("/students", { params:{
        page: params.page,
        size: params.size,
        name: params.name,
        status: params.status,
        sort: params.sortBy
        ? `${params.sortBy}, ${params.sortDir}` : undefined
    }});
    return response.data;
}

export async function createStudent(student: CreateStudentRequest) {
    const response = await api.post("/students", student);
    return response.data;
}