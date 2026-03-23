import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import Welcome from '../pages/home/Welcome'
import NotFound from '../pages/home/NotFound'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path='home' element={<Welcome />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}