import AppLayout from '../layout/AppLayout'

import StudentPage from '../features/student/pages/StudentPage'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import StudentCreatePage from '../features/student/pages/StudentCreatePage'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

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
                        element: <StudentCreatePage />,
                        handle: {
                            title: "Add Student",
                            breadcrumb: [
                                { label: "Home", to: "/" },
                                { label: "Students", to: "/students" },
                                { label: "Add Student" }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default function AppRoutes() {
        return <RouterProvider router={router} />;
}