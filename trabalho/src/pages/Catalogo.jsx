import { useState, useEffect } from "react";
import { buscarCatalogoInicial, buscarFilmesPorTitulo } from "../services/api";
import Pesquisa from "../components/Pesquisa";
import Categorias from "../components/Categorias";
import ListaFilmes from "../components/ListaFilmes";
import "./Catalogo.css";

function Catalogo() {
  const [filmesIniciais, setFilmesIniciais] = useState([]);
  const [filmesExibidos, setFilmesExibidos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  
  useEffect(() => {
    async function carregarCatalogo() {
      setCarregando(true);
      const lista = await buscarCatalogoInicial();
      setFilmesIniciais(lista);
      setFilmesExibidos(lista);
      setCarregando(false);
    }

    carregarCatalogo();
  }, []);

  
  function handleSelecionarCategoria(categoria) {
    setCategoriaAtiva(categoria);
    setTermoBusca("");
    setErro(null);

    if (categoria === "Todos") {
      setFilmesExibidos(filmesIniciais);
    } else {
      const filtrados = filmesIniciais.filter(
        (filme) => filme.Genre && filme.Genre.includes(categoria)
      );
      setFilmesExibidos(filtrados);
    }
  }

  
  async function handlePesquisar(titulo, pagina = 1) {
    setCarregando(true);
    setErro(null);
    setTermoBusca(titulo);
    setPaginaAtual(pagina);
    setCategoriaAtiva("Todos");

    const resposta = await buscarFilmesPorTitulo(titulo, pagina);

    if (resposta.erro) {
      setFilmesExibidos([]);
      setTotalResultados(0);
      setErro("Nenhum filme encontrado com esse nome.");
    } else {
      setFilmesExibidos(resposta.filmes);
      setTotalResultados(resposta.totalResultados);
    }

    setCarregando(false);
  }

  function handleLimparPesquisa() {
    setTermoBusca("");
    setErro(null);
    setCategoriaAtiva("Todos");
    setPaginaAtual(1);
    setTotalResultados(0);
    setFilmesExibidos(filmesIniciais);
  }

  const totalPaginas = Math.ceil(totalResultados / 10);

  return (
    <div className="catalogo-page">
      <div className="catalogo-topo">
        <h1>Catálogo de Filmes</h1>
        <p>Pesquise por título ou filtre por gênero abaixo</p>
      </div>

      <Pesquisa
        aoPesquisar={(titulo) => handlePesquisar(titulo, 1)}
        aoLimpar={handleLimparPesquisa}
        termoAtual={termoBusca}
      />

      {!termoBusca && (
        <Categorias
          categoriaAtiva={categoriaAtiva}
          aoSelecionar={handleSelecionarCategoria}
        />
      )}

      {carregando ? (
        <p className="status-msg">Buscando filmes...</p>
      ) : erro ? (
        <p className="status-msg">{erro}</p>
      ) : (
        <>
          {termoBusca && (
            <p className="info-busca">
              Exibindo resultados para <strong>"{termoBusca}"</strong> (Página{" "}
              {paginaAtual} de {totalPaginas})
            </p>
          )}

          <ListaFilmes filmes={filmesExibidos} />

          {/* Controles de Paginação (aparecem quando há mais de 1 página na pesquisa) */}
          {termoBusca && totalPaginas > 1 && (
            <div className="paginacao">
              <button
                disabled={paginaAtual === 1}
                onClick={() => handlePesquisar(termoBusca, paginaAtual - 1)}
              >
                ← Anterior
              </button>

              <span>
                Página {paginaAtual} de {totalPaginas}
              </span>

              <button
                disabled={paginaAtual >= totalPaginas}
                onClick={() => handlePesquisar(termoBusca, paginaAtual + 1)}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Catalogo;