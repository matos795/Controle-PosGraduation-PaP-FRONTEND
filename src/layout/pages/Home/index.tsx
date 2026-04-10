import homeImg from "../../../assets/logoPap.svg";
import './styles.css'

export default function Home() {
  return (
    <div className="cp-home">

      <div className="cp-home-top">

        <div className="cp-home-text">
          <h1>Bem-vindo ao Pregue a Palavra</h1>

          <p>
            Gerencie alunos, professores, matérias e pagamentos
            de forma simples e organizada.
          </p>

        </div>

        <img
          className="cp-home-img"
          src={homeImg}
          alt="home"
        />

      </div>


      <div className="cp-home-cards">

        <div className="cp-home-card">
          <h3>Alunos</h3>
          <p>Gerencie todos os alunos cadastrados</p>
        </div>

        <div className="cp-home-card">
          <h3>Professores</h3>
          <p>Controle professores e turmas</p>
        </div>

        <div className="cp-home-card">
          <h3>Matérias</h3>
          <p>Organize as disciplinas</p>
        </div>

        <div className="cp-home-card">
          <h3>Pagamentos</h3>
          <p>Acompanhe assinaturas e planos</p>
        </div>

      </div>

    </div>
  )
}
