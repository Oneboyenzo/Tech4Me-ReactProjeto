import CardFilme from "./CardFilme";
import "./ListaFilmes.css";

function ListaFilmes({ filmes }) {
  if (!filmes || filmes.length === 0) {
    return (
      <p className="sem-resultados">
        Nenhum filme encontrado para essa busca ou categoria.
      </p>
    );
  }

  return (
    <div className="lista-filmes">
      {filmes.map((filme) => (
        <CardFilme key={filme.imdbID} filme={filme} />
      ))}
    </div>
  );
}

export default ListaFilmes;