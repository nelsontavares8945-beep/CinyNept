* {
  box-sizing: border-box;
}

:root {
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  background: #0a0a0a;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: #0a0a0a;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 0, 0, 0.08), transparent 35%),
    #0a0a0a;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
}

.app-shell {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: #e50914;
  border-radius: 8px;
  font-weight: 800;
  color: #fff;
}

.brand-name {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.profile-pill {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #f5f5f5;
  color: #111;
  font-weight: 700;
}

main {
  padding-bottom: 3rem;
}

.hero {
  position: relative;
  min-height: 620px;
  padding: 4rem 2rem 2rem;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: end;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.6) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
  padding: 2rem 0 0;
}

.eyebrow {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: #d1d1d1;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  color: #d9d9d9;
  font-size: 0.9rem;
}

.description {
  margin-top: 1.25rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
}

.primary,
.secondary,
.chip {
  border: none;
  border-radius: 999px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary,
.secondary {
  padding: 0.9rem 1.4rem;
  font-weight: 700;
}

.primary {
  background: #fff;
  color: #111;
}

.secondary {
  background: rgba(255, 255, 255, 0.14);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.primary:hover,
.secondary:hover,
.chip:hover,
.movie-card:hover,
.mini-card:hover {
  transform: translateY(-2px);
}

.controls-panel {
  padding: 1.5rem 2rem 0.5rem;
}

.search-box {
  margin-bottom: 1rem;
}

.search-box input {
  width: min(100%, 460px);
  padding: 0.9rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.genre-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.chip {
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.chip.active {
  background: #e50914;
  color: white;
}

.catalog-section {
  padding: 1.5rem 2rem 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.section-header span {
  color: rgba(255, 255, 255, 0.7);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.movie-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.movie-card.selected {
  border-color: rgba(229, 9, 20, 0.8);
  box-shadow: 0 0 0 1px rgba(229, 9, 20, 0.5);
}

.movie-card img {
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.card-info {
  padding: 0.85rem 0.8rem 1rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.72rem;
  margin-bottom: 0.5rem;
}

.card-info strong {
  display: block;
  font-size: 0.92rem;
}

.movie-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.9rem;
}

.mini-card {
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.2s ease;
}

.mini-card img {
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

@media (max-width: 768px) {
  .topbar {
    padding: 0.9rem 1rem;
  }

  .nav {
    display: none;
  }

  .hero {
    min-height: 520px;
    padding: 3rem 1rem 1.5rem;
  }

  .controls-panel,
  .catalog-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
