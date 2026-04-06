import { api } from "../../../services/api.ts"
import type { PageResponse } from "../../../types/PageResponse.ts";
import type { StudentResponse } from "../types/student.ts"

export async function getStudents(params: {
    page: number;
    size: number;
    name?: string;
    status?: string;
}): Promise<PageResponse<StudentResponse>> {
    const response = await api.get("/students", { params });
    return response.data;
}