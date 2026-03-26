import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'

import StudentPage from '../features/student/pages/StudentPage'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path='home' element={<Home />} />
                    <Route path='students' element={<StudentPage />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}