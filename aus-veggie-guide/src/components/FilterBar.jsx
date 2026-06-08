import "./FilterBar.css";

const SEASON_COLORS = {
  spring: "#84cc16",
  summer: "#f59e0b",
  autumn: "#f97316",
  winter: "#3b82f6",
  ALL: "#6366f1",
};

const SEASON_EMOJIS = {
  spring: "🌸",
  summer: "☀️",
  autumn: "🍂",
  winter: "❄️",
  ALL: "🌏",
};

export default function FilterBar({
  states, seasons, categories,
  selectedState, selectedSeason, selectedCategory,
  onStateChange, onSeasonChange, onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">State / Territory</label>
        <div className="filter-pills">
          {states.map((s) => (
            <button
              key={s.code}
              className={`pill state-pill${selectedState === s.code ? " active" : ""}`}
              onClick={() => onStateChange(s.code)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Season</label>
        <div className="filter-pills">
          {seasons.map((s) => (
            <button
              key={s.code}
              className={`pill season-pill${selectedSeason === s.code ? " active" : ""}`}
              style={selectedSeason === s.code ? { backgroundColor: SEASON_COLORS[s.code], borderColor: SEASON_COLORS[s.code] } : {}}
              onClick={() => onSeasonChange(s.code)}
            >
              {SEASON_EMOJIS[s.code]} {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <div className="filter-pills">
          {categories.map((c) => (
            <button
              key={c.code}
              className={`pill cat-pill${selectedCategory === c.code ? " active" : ""}`}
              onClick={() => onCategoryChange(c.code)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
