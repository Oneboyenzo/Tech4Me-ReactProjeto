import { useState, useEffect } from "react";
import { buscarDetalhesFilme, buscarCatalogoInicial } from "../services/api";
import Banner from "../components/Banner";
import ListaFilmes from "../components/ListaFilmes";
import "./Home.css";

function Home() {
  const [filmeDestaque, setFilmeDestaque] = useState(null);
  const [recomendados, setRecomendados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarPaginaInicial() {
      setCarregando(true);
      setErro(null);

      
      const [resDestaque, listaFilmes] = await Promise.all([
        buscarDetalhesFilme("tt0816692"),
        buscarCatalogoInicial(),
      ]);

      if (resDestaque.erro && listaFilmes.length === 0) {
        setErro("Não foi possível carregar os filmes. Verifique sua API Key.");
      } else {
        setFilmeDestaque(resDestaque.filme);
        setRecomendados(listaFilmes.slice(0, 8)); // Exibe 8 filmes recomendados
      }

      setCarregando(false);
    }

    carregarPaginaInicial();
  }, []);

  if (carregando) {
    return <p className="status-msg">Carregando destaques...</p>;
  }

  if (erro) {
    return <p className="status-msg erro">{erro}</p>;
  }

  return (
    <div className="home-page">
      <Banner filmeDestaque={filmeDestaque} />

      <section className="secao-recomendados">
        <div className="secao-cabecalho">
          <h2>Filmes Recomendados</h2>
          <p>Uma seleção especial para você começar a explorar</p>
        </div>

        <ListaFilmes filmes={recomendados} />
      </section>
    </div>
  );
}

export default Home;