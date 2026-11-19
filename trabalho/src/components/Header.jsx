import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🎬 Filmes<span>React</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Página Inicial</Link>
          <Link to="/catalogo">Catálogo</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;