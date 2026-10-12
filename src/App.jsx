import { useMemo, useState } from 'react';
import { movies } from './data/movies';

const genres = ['Todos', 'Ação', 'Aventura', 'Drama', 'Comédia', 'Fantasia', 'Sci-Fi', 'Suspense', 'Animação', 'Romance', 'Biografia'];

function ArchiveCatalog() {
  const [term, setTerm] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Pesquise pelo título para consultar o acervo do Internet Archive.');

  async function searchArchive(event) {
    event.preventDefault();
    const safeTerm = term.replace(/[^a-zA-Z0-9À-ÿ\s'-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!safeTerm) {
      setItems([]);
      setTotal(0);
      setMessage('Digite um título para pesquisar.');
      return;
    }

    setLoading(true);
    setMessage('');
    setItems([]);
    setTotal(0);

    try {
      const params = new URLSearchParams();
      params.set('q', `mediatype:movies AND title:"${safeTerm}"`);
      params.append('fl[]', 'identifier');
      params.append('fl[]', 'title');
      params.set('rows', '24');
      params.set('page', '1');
      params.set('output', 'json');
      const response = await fetch(`https://archive.org/advancedsearch.php?${params.toString()}`);
      if (!response.ok) throw new Error('Archive search failed');
      const data = await response.json();
      const docs = Array.isArray(data?.response?.docs) ? data.response.docs : [];
      setItems(docs);
      setTotal(data?.response?.numFound || docs.length);
      if (!docs.length) setMessage('Não encontrei resultados com esse título. Tente outra busca.');
    } catch {
      setMessage('Não consegui consultar o Internet Archive agora. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="catalog-section archive-catalog">
      <div className="section-header">
        <h2>Acervo do Internet Archive</h2>
        <span>{total ? `${items.length} de ${total} resultados` : 'Busca por título'}</span>
      </div>
      <p className="archive-note">Pesquise itens classificados como filmes no Internet Archive. O acervo pode incluir vídeos de eventos; confira a página e a licença de cada item antes de assistir ou baixar.</p>
      <form className="archive-form" onSubmit={searchArchive}>
        <div className="search-box">
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Ex.: Nosferatu, Charlie Chaplin..."
            aria-label="Buscar filmes no Internet Archive"
          />
        </div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar no acervo'}
        </button>
      </form>
      {message && <p className="archive-message" aria-live="polite">{message}</p>}
      <div className="movie-grid">
        {items.map((item) => (
          <article className="movie-card archive-card" key={item.identifier}>
            <div className="card-info">
              <div className="card-row"><span>Internet Archive</span></div>
              <strong>{item.title || item.identifier}</strong>
              <a
                className="archive-link"
                href={`https://archive.org/details/${encodeURIComponent(item.identifier)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir item e opções de reprodução
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(movies[0]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre = activeGenre === 'Todos' || movie.genre === activeGenre;
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) || movie.description.toLowerCase().includes(search.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [activeGenre, search]);

  const featuredMovie = selected || filteredMovies[0] || movies[0];
  const genreCollections = useMemo(() => {
    return genres
      .filter((genre) => genre !== 'Todos')
      .map((genre) => ({ name: genre, items: movies.filter((movie) => movie.genre === genre).slice(0, 8) }));
  }, []);

  const openTrailer = (movie) => {
    const query = encodeURIComponent(`${movie.title} trailer oficial`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const openLegalStreaming = (movie) => {
    const query = encodeURIComponent(`${movie.title} assistir legal`);
    window.open(`https://www.justwatch.com/br/busca?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">C</div>
          <div className="brand-name">CinyNept</div>
        </div>
        <nav className="nav">
          <span>Início</span><span>Séries</span><span>Filmes</span><span>Minha Lista</span>
        </nav>
        <div className="profile-pill">N</div>
      </header>
      <main>
        <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.25)), url(${featuredMovie.poster})` }}>
          <div className="hero-content">
            <p className="eyebrow">Catálogo premium</p>
            <h1>{featuredMovie.title}</h1>
            <div className="meta-row"><span>{featuredMovie.year}</span><span>{featuredMovie.genre}</span><span>{featuredMovie.duration}</span></div>
            <p className="description">{featuredMovie.description}</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => openTrailer(featuredMovie)}>▶ Assistir trailer</button>
              <button className="secondary" onClick={() => openLegalStreaming(featuredMovie)}>Ver onde está disponível</button>
            </div>
          </div>
        </section>
        <section className="controls-panel">
          <div className="search-box"><input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar filmes, gêneros ou títulos" /></div>
          <div className="genre-list">
            {genres.map((genre) => (
              <button key={genre} className={genre === activeGenre ? 'chip active' : 'chip'} onClick={() => setActiveGenre(genre)}>{genre}</button>
            ))}
          </div>
        </section>
        <section className="catalog-section">
          <div className="section-header"><h2>Resultados</h2><span>{filteredMovies.length} títulos</span></div>
          <div className="movie-grid">
            {filteredMovies.slice(0, 18).map((movie) => (
              <article key={movie.id} className={selected?.id === movie.id ? 'movie-card selected' : 'movie-card'} onClick={() => setSelected(movie)}>
                <img src={movie.poster} alt={movie.title} />
                <div className="card-info"><div className="card-row"><span>{movie.year}</span><span>{movie.genre}</span></div><strong>{movie.title}</strong></div>
              </article>
            ))}
          </div>
        </section>
        <ArchiveCatalog />
        {genreCollections.map((collection) => (
          <section className="catalog-section" key={collection.name}>
            <div className="section-header"><h2>{collection.name}</h2></div>
            <div className="movie-row">
              {collection.items.map((movie) => (
                <article key={movie.id} className="mini-card" onClick={() => setSelected(movie)}><img src={movie.poster} alt={movie.title} /></article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
