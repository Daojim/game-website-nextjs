// components/GameCard.jsx
export default function GameCard({ game }) {
  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toDateString()
    : "Unknown";

  const imageUrl = game.cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
    : "https://via.placeholder.com/150x210?text=No+Image";

  return (
    <div className="game-card">
      <img src={imageUrl} alt={game.name} />
      <h3>{game.name}</h3>
      <p>Released: {releaseDate}</p>
      {game.genres && (
        <p>Genres: {game.genres.map((g) => g.name).join(", ")}</p>
      )}
    </div>
  );
}
