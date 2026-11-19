import "./Categorias.css";

const LISTA_CATEGORIAS = [
  { nome: "Todos", valorApi: "Todos" },
  { nome: "Ação", valorApi: "Action" },
  { nome: "Aventura", valorApi: "Adventure" },
  { nome: "Comédia", valorApi: "Comedy" },
  { nome: "Drama", valorApi: "Drama" },
  { nome: "Terror", valorApi: "Horror" },
  { nome: "Ficção Científica", valorApi: "Sci-Fi" },
];

function Categorias({ categoriaAtiva, aoSelecionar }) {
  return (
    <div className="categorias-container">
      {LISTA_CATEGORIAS.map((cat) => (
        <button
          key={cat.valorApi}
          className={`categoria-btn ${
            categoriaAtiva === cat.valorApi ? "ativa" : ""
          }`}
          onClick={() => aoSelecionar(cat.valorApi)}
        >
          {cat.nome}
        </button>
      ))}
    </div>
  );
}

export default Categorias;