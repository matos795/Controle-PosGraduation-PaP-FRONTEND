import './styles.css'
import { useLocation } from "react-router-dom";
import userImg from '../../../assets/user.png'

export default function Header() {

    const location = useLocation();

    const getTitle = (pathname: string): string => {
        switch (pathname) {
            case "/home":
                return "Página Principal";

            case "/students":
                return "Listagem de Alunos";

            case "/subjects":
                return "Listagem de Matérias";

            case "/teachers":
                return "Listagem de Professores";

            case "/class-sessions":
                return "Listagem de Módulos";

            default:
                return "Dashboard";
        }
    };

    return (
        <header className="cp-header">

            <div className="cp-header-left">
                <h1>{getTitle(location.pathname)}</h1>
            </div>

            <div className="cp-header-right">

                <div className="cp-user">
                    <img src={userImg} alt="class-session" />
                    Admin ▾
                </div>

            </div>

        </header>
    )
}