import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import Welcome from '../pages/home/Welcome'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path='home' element={<Welcome />} />
                    <Route path='students' element={<Welcome />} />
                    <Route path='subjects' element={<Welcome />} />
                    <Route path='teachers' element={<Welcome />} />
                    <Route path='class-sessions' element={<Welcome />} />
                </Route>

                {/* fallback para rota não encontrada */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}