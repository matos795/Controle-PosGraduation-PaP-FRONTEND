import AppLayout from '../layout/AppLayout'

import StudentPage from '../features/student/pages/StudentPage'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import StudentForm from '../features/student/components/StudentForm'

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