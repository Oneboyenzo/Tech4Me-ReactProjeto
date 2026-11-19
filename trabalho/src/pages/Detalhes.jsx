import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarDetalhesFilme } from "../services/api";
import "./Detalhes.css";

function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      setCarregando(true);
      setErro(null);

      const resposta = await buscarDetalhesFilme(id);

      if (resposta.erro) {
        setErro("Filme não encontrado ou erro ao carregar informações.");
      } else {
        setFilme(resposta.filme);
      }

      setCarregando(false);
    }

    carregarDetalhes();
  }, [id]);

  if (carregando) {
    return <p className="status-msg">Carregando informações do filme...</p>;
  }

  if (erro || !filme) {
    return (
      <div className="detalhes-erro">
        <p>{erro}</p>
        <Link to="/catalogo" className="btn-voltar">
          ← Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const posterValido =
    filme.Poster && filme.Poster !== "N/A"
      ? filme.Poster
      : "https://via.placeholder.com/300x450/1f1f1f/ffffff?text=Sem+Poster";

  return (
    <div className="detalhes-page">
      <Link to="/catalogo" className="btn-voltar">
        ← Voltar ao Catálogo
      </Link>

      <div className="detalhes-card">
        <img
          src={posterValido}
          alt={filme.Title}
          className="detalhes-poster"
        />

        <div className="detalhes-info">
          <h1>{filme.Title}</h1>

          <div className="detalhes-tags">
            <span>📅 {filme.Year}</span>
            <span>⏱️ {filme.Runtime}</span>
            <span>🔞 Classificação: {filme.Rated}</span>
            <span className="tag-nota">
              ⭐ {filme.imdbRating} / 10 ({filme.imdbVotes} avaliações)
            </span>
          </div>

          <p className="detalhes-genero">
            <strong>Gênero:</strong> {filme.Genre}
          </p>

          <div className="detalhes-sinopse">
            <h3>Sinopse</h3>
            <p>{filme.Plot}</p>
          </div>

          <div className="detalhes-ficha">
            <p>
              <strong>Diretor:</strong> {filme.Director}
            </p>
            <p>
              <strong>Elenco Principal:</strong> {filme.Actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;