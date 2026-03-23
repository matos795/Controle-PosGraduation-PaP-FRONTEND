import { NavLink } from "react-router-dom";
import logoImg from '../../../assets/logoPap.png'
import alunoImg from '../../../assets/sidebar/aluno.png'
import homeImg from '../../../assets/sidebar/home.png'
import subjectImg from '../../../assets/sidebar/subject.png'
import professorImg from '../../../assets/sidebar/professor.png'
import calendarioImg from '../../../assets/sidebar/calendario.png'
import planilhaImg from '../../../assets/sidebar/planilha.png'
import contaImg from '../../../assets/sidebar/conta.png'
import progressImg from '../../../assets/sidebar/progress.png'
import './styles.css'

export default function SideBar() {
    return (
        <aside className="cp-sidebar">

            <div className="cp-sidebar-top">
                <img src={logoImg} alt="home" />
            </div>

            <div className="cp-sidebar-bottom">
                <NavLink to="/home" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                    <img src={homeImg} alt="home" />
                    <p>Início</p>
                </NavLink>
                <NavLink to="/students" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={alunoImg} alt="student" />
                        <p>Alunos</p>
                </NavLink>
                <NavLink to="/subjects" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={subjectImg} alt="subject" />
                        <p>Matérias</p>
                </NavLink>
                <NavLink to="/teachers" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={professorImg} alt="teacher" />
                        <p>Professores</p>
                </NavLink>
                <NavLink to="/class-sessions" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={calendarioImg} alt="class-session" />
                        <p>Módulos</p>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={planilhaImg} alt="subscription" />
                        <p>Inscrições</p>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={contaImg} alt="payment" />
                        <p>Pagamentos</p>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => `cp-menu-item ${isActive ? "cp-active" : ""}`}>
                        <img src={progressImg} alt="progress" />
                        <p>Progresso</p>
                </NavLink>
            </div>

        </aside>
    )
}