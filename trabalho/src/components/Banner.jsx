import { Link } from "react-router-dom";
import "./Banner.css";

function Banner({ filmeDestaque }) {
  return (
    <section className="banner">
      <div className="banner-texto">
        <span className="banner-badge">🔥 Em Destaque</span>
        <h1>Explore o melhor do cinema no CineReact</h1>
        <p>
          Descubra avaliações, sinopses completas, elenco e informações
          detalhadas de milhares de filmes direto da base do IMDb.
        </p>

        {filmeDestaque && (
          <div className="banner-filme-info">
            <h2>{filmeDestaque.Title}</h2>
            <span>
              {filmeDestaque.Year} • {filmeDestaque.Genre} • ⭐{" "}
              {filmeDestaque.imdbRating}
            </span>
          </div>
        )}

        <div className="banner-botoes">
          <Link to="/catalogo" className="btn-primario">
            Explorar Catálogo
          </Link>
          {filmeDestaque && (
            <Link
              to={`/filme/${filmeDestaque.imdbID}`}
              className="btn-secundario"
            >
              Ver Detalhes
            </Link>
          )}
        </div>
      </div>

      {filmeDestaque && filmeDestaque.Poster !== "N/A" && (
        <div className="banner-imagem">
          <img src={filmeDestaque.Poster} alt={filmeDestaque.Title} />
        </div>
      )}
    </section>
  );
}

export default Banner;