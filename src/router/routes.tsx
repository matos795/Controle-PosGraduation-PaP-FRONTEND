import AppLayout from '../layout/AppLayout'

import StudentPage from '../layout/pages/features/student/pages/StudentPage'

import NotFound from '../layout/pages/NotFound'
import Home from '../layout/pages/Home'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import StudentForm from '../layout/pages/features/student/components/StudentForm'
import SubjectPage from '../layout/pages/features/subjects/pages/SubjectPage';
import TeachersPage from '../layout/pages/features/teacher/pages/TeachersPage';
import TeacherForm from '../layout/pages/features/teacher/pages/TeacherFormPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="home" />
            },
            {
                path: "home",
                element: <Home />,
                handle: {
                    title: "Página Inicial",
                }
            },
            {
                path: "students",
                children: [
                    {
                        index: true,
                        element: <StudentPage />,
                        handle: {
                            title: "Students",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Students" }]
                        }
                    },
                    {
                        path: "new",
                        element: <StudentForm />,
                        handle: {
                            title: "Add Student",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Students", to: "/students" },
                                { label: "Add Student" }
                            ]
                        }
                    },
                    {
                        path: ":id",
                        element: <StudentForm />,
                        handle: {
                            title: "Update Student",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Students", to: "/students" },
                                { label: "Update Student" }
                            ]
                        }
                    }
                ],
            },
            {
                path: "subjects",
                children: [
                    {
                        index: true,
                        element: <SubjectPage />,
                        handle: {
                            title: "Subjects",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Subjects" }]
                        }
                    },
                ]
            },
            {
                path: "teachers",
                children: [
                    {
                        index: true,
                        element: <TeachersPage />,
                        handle: {
                            title: "Teachers",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Teachers" }]
                        }
                    },
                    {
                        path: "new",
                        element: <TeacherForm />,
                        handle: {
                            title: "Add Teacher",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Teachers", to: "/teachers" },
                                { label: "Add Teacher" }
                            ]
                        }
                    },
                    {
                        path: ":id",
                        element: <TeacherForm />,
                        handle: {
                            title: "Update Teacher",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Teachers", to: "/teachers" },
                                { label: "Update Teacher" }
                            ]
                        }
                    }
                ]
            },

            {
                path: "*",
                element: <NotFound />,
                handle: {
                    breadcrumb: [
                        { label: "Home", to: "/" },
                        { label: "Not Found" }
                    ]
                }
            }
        ]
    }
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}