import { api } from "../../../services/api.ts"
import type { PageResponse } from "../../../types/PageResponse.ts";
import type { StudentResponse } from "../types/student.ts"

export async function getStudents(page: number, size: number): Promise<PageResponse<StudentResponse>> {
    const response = await api.get("/students", { params: {page, size} });
    return response.data;
}