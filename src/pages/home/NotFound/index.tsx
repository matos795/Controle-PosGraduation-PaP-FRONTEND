import { useNavigate } from "react-router-dom";
import "./styles.css";
import notFoundImg from "../../../assets/notfound.png";

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="cp-notfound">

      <div className="cp-notfound-box">

        <img
          src={notFoundImg}
          alt="not found"
          className="cp-notfound-img"
        />

        <h1>404</h1>

        <h2>Rota não disponível</h2>

        <p>
          A página que você tentou acessar não existe
          ou não está disponível no sistema.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="cp-notfound-btn"
        >
          Voltar para Home
        </button>

      </div>

    </div>
  );
}