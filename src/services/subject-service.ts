import type { CreateSubjectRequest, SubjectResponse, UpdateSubjectRequest } from "../types/subject";
import { api } from "../utils/api";

export async function getSubjects(params: {name?: string; sortBy?: string; sortDir?: string; }): Promise<SubjectResponse[]> {
    const response = await api.get("/subjects", {
        params: {
            name: params.name,
            sort: params.sortBy ? `${params.sortBy}, ${params.sortDir}` : undefined
        }
    });
    return response.data;
}

export async function createSubject(subject: CreateSubjectRequest) {
    const response = await api.post("/subjects", subject);
    return response.data;
}

export async function getSubjectById(id: number) {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
}

export async function updateSubject(id: number, subject: UpdateSubjectRequest) {
    const response = await api.put(`/subjects/${id}`, subject);
    return response.data;
}

export async function deleteSubject(id: number) {
    await api.delete(`/subjects/${id}`)
}

export async function deleteSelectedSubjects(ids: number[]) {
    await api.delete(`/subjects`, {
        data: ids
    });
}