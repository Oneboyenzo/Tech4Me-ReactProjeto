import { Link } from "react-router-dom";
import "./CardFilme.css";

function CardFilme({ filme }) {
  const posterValido =
    filme.Poster && filme.Poster !== "N/A"
      ? filme.Poster
      : "https://via.placeholder.com/300x450/1f1f1f/ffffff?text=Sem+Poster";

  return (
    <Link to={`/filme/${filme.imdbID}`} className="card-filme">
      <div className="card-poster-wrapper">
        <img src={posterValido} alt={filme.Title} className="card-poster" />
        {filme.imdbRating && filme.imdbRating !== "N/A" && (
          <span className="card-nota">⭐ {filme.imdbRating}</span>
        )}
      </div>

      <div className="card-info">
        <h3 className="card-titulo">{filme.Title}</h3>
        <span className="card-ano">{filme.Year}</span>
      </div>
    </Link>
  );
}

export default CardFilme;