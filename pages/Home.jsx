import GameCard from "../components/GameCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // const games = [
  //   { id: 1, title: "Hollow Knight", release_date: "2017" },
  //   { id: 2, title: "Elden Ring", release_date: "2022" },
  //   { id: 3, title: "Clair Obscur: Expedition 33", release_date: "2025" },
  // ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for games..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <div className="games-grid">
        {games.map(
          (game) =>
            game.title.toLowerCase().startsWith(searchQuery) && (
              <GameCard game={game} key={game.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;
