import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = `
    search "${searchQuery}";
    fields name, cover.image_id, first_release_date, genres.name;
    limit 10;
  `;

    try {
      console.log("Sending query:", query); // 👈 Debug line

      const res = await axios.post("/api/games", { query });

      console.log("API Response:", res.data); // 👈 Debug line

      setGames(res.data);
    } catch (err) {
      console.error("IGDB fetch error:", err); // 👈 Debug line
    }

    setSearchQuery("");
  };

  return (
    <div className="home">
      <NavBar />

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
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
