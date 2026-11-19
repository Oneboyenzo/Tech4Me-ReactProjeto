
const API_KEY = "80250e26";
const BASE_URL = "https://www.omdbapi.com/";


export async function buscarFilmesPorTitulo(titulo, pagina = 1) {
  try {
    const resposta = await fetch(
      `${BASE_URL}?s=${encodeURIComponent(titulo)}&type=movie&page=${pagina}&apikey=${API_KEY}`
    );
    const dados = await resposta.json();

    if (dados.Response === "False") {
      return { filmes: [], totalResultados: 0, erro: dados.Error };
    }

    return {
      filmes: dados.Search,
      totalResultados: Number(dados.totalResults),
      erro: null,
    };
  } catch (erro) {
    return {
      filmes: [],
      totalResultados: 0,
      erro: "Erro de conexão com a API.",
    };
  }
}


export async function buscarDetalhesFilme(imdbID) {
  try {
    const resposta = await fetch(
      `${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`
    );
    const dados = await resposta.json();

    if (dados.Response === "False") {
      return { filme: null, erro: dados.Error };
    }

    return { filme: dados, erro: null };
  } catch (erro) {
    return { filme: null, erro: "Erro ao carregar os detalhes do filme." };
  }
}

export async function buscarCatalogoInicial() {
  const termos = ["Batman", "Avengers", "Spider-Man", "Matrix"];
  const promessasBusca = termos.map((termo) =>
    fetch(`${BASE_URL}?s=${termo}&type=movie&apikey=${API_KEY}`).then((res) =>
      res.json()
    )
  );

  const resultados = await Promise.all(promessasBusca);

 
  const listaResumida = resultados
    .flatMap((res) => (res.Search ? res.Search.slice(0, 3) : []))
    .filter(
      (filme, index, self) =>
        index === self.findIndex((f) => f.imdbID === filme.imdbID)
    );

  
  const promessasDetalhes = listaResumida.map((filme) =>
    fetch(`${BASE_URL}?i=${filme.imdbID}&apikey=${API_KEY}`).then((res) =>
      res.json()
    )
  );

  const filmesCompletos = await Promise.all(promessasDetalhes);
  return filmesCompletos.filter((filme) => filme.Response === "True");
}