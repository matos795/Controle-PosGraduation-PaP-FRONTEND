import type { PageResponse } from "../types/PageResponse";
import type { CreateTeacherRequest, TeacherResponse, UpdateTeacherRequest } from "../types/teachers";
import { api } from "../utils/api";

export async function getTeachers(params: {
    page: number;
    size: number;
    name?: string;
    sortBy?: string;
    sortDir?: string;
}): Promise<PageResponse<TeacherResponse>> {
    const response = await api.get("/teachers", { params:{
        page: params.page,
        size: params.size,
        name: params.name,
        sort: params.sortBy
        ? `${params.sortBy}, ${params.sortDir}` : undefined
    }});
    return response.data;
}

export async function createTeacher(teacher: CreateTeacherRequest) {
    const response = await api.post("/teachers", teacher);
    return response.data;
}

export async function getTeacherById(id: number) {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
}

export async function updateTeacher(id: number, teacher: UpdateTeacherRequest) {
    const response = await api.put(`/teachers/${id}`, teacher);
    return response.data;
}

export async function deleteTeacher(id: number) {
    await api.delete(`/teachers/${id}`)
}

export async function deleteSelectedTeachers(ids: number[]) {
    await api.delete(`/teachers`, {
        data: ids
    });
}