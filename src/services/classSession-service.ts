import { api } from "../utils/api.ts"
import type { PageResponse } from "../types/PageResponse.ts";
import type { ClassSessionResponse, CreateClassSessionRequest, UpdateClassSessionRequest } from "../types/classSession.ts";

export async function getClassSessions(params: {
    page: number;
    size: number;
    name?: string;
    sortBy?: string;
    sortDir?: string;
    subjectId?: number | string;
    startDate?: string;
    endDate?: string;
    year?: string | number;
}): Promise<PageResponse<ClassSessionResponse>> {
    const response = await api.get("/class-sessions", {
        params: {
            page: params.page,
            size: params.size,
            name: params.name,
            sort: params.sortBy ? `${params.sortBy},${params.sortDir}` : undefined,
            subjectId: params.subjectId,
            startDate: params.startDate,
            endDate: params.endDate,
            year: params.year
        }
    });
    return response.data;
}

export async function createClassSession(classSession: CreateClassSessionRequest) {
    const response = await api.post("/class-sessions", classSession);
    return response.data;
}

export async function getClassSessionById(id: number) {
    const response = await api.get(`/class-sessions/${id}`);
    return response.data;
}

export async function updateClassSession(id: number, classSession: UpdateClassSessionRequest) {
    const response = await api.put(`/class-sessions/${id}`, classSession);
    return response.data;
}

export async function deleteClassSession(id: number) {
    await api.delete(`/class-sessions/${id}`)
}

export async function deleteSelectedClassSessions(ids: number[]) {
    await api.delete(`/class-sessions`, {
        data: ids
    });
}