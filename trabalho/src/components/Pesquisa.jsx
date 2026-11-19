import { useState } from "react";
import "./Pesquisa.css";

function Pesquisa({ aoPesquisar, aoLimpar, termoAtual }) {
  const [texto, setTexto] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (texto.trim() !== "") {
      aoPesquisar(texto.trim());
    }
  }

  function handleLimpar() {
    setTexto("");
    aoLimpar();
  }

  return (
    <form className="pesquisa-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="pesquisa-input"
        placeholder="Digite o nome de um filme (ex: Batman, Matrix, Interstellar)..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit" className="pesquisa-btn">
        🔍 Pesquisar
      </button>

      {termoAtual && (
        <button
          type="button"
          className="pesquisa-btn-limpar"
          onClick={handleLimpar}
        >
          Limpar
        </button>
      )}
    </form>
  );
}

export default Pesquisa;