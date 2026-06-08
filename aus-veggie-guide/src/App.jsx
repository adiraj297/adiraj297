import { useState } from "react";
import { vegetables, STATES, SEASONS, CATEGORIES } from "./data/vegetables";
import VeggieCard from "./components/VeggieCard";
import FilterBar from "./components/FilterBar";
import "./App.css";

export default function App() {
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedSeason, setSelectedSeason] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = vegetables.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || v.category === selectedCategory;

    if (!matchesSearch || !matchesCategory) return false;

    if (selectedSeason === "ALL" && selectedState === "ALL") return true;

    if (selectedState === "ALL") {
      return Object.values(v.seasons).some(
        (s) => s.plant.includes(selectedSeason) || s.harvest.includes(selectedSeason)
      );
    }

    const stateData = v.seasons[selectedState];
    if (!stateData) return false;

    if (selectedSeason === "ALL") return true;

    return stateData.plant.includes(selectedSeason) || stateData.harvest.includes(selectedSeason);
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-flag">🇦🇺</span>
            <div>
              <h1>Aussie Veggie Guide</h1>
              <p>When &amp; where to grow vegetables across Australia</p>
            </div>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search vegetables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="main">
        <FilterBar
          states={STATES}
          seasons={SEASONS}
          categories={CATEGORIES}
          selectedState={selectedState}
          selectedSeason={selectedSeason}
          selectedCategory={selectedCategory}
          onStateChange={setSelectedState}
          onSeasonChange={setSelectedSeason}
          onCategoryChange={setSelectedCategory}
        />

        <div className="results-info">
          <span>
            {filtered.length} vegetable{filtered.length !== 1 ? "s" : ""}
            {selectedState !== "ALL" && ` in ${STATES.find((s) => s.code === selectedState)?.name}`}
            {selectedSeason !== "ALL" && ` · ${SEASONS.find((s) => s.code === selectedSeason)?.name}`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span>🌱</span>
            <p>No vegetables match your filters. Try adjusting the season or state.</p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((veg) => (
              <VeggieCard
                key={veg.id}
                veg={veg}
                selectedState={selectedState}
                selectedSeason={selectedSeason}
                expanded={expandedId === veg.id}
                onToggle={() => setExpandedId(expandedId === veg.id ? null : veg.id)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🌿 Planting times are general guides — always check your local microclimate &amp; last frost dates.</p>
      </footer>
    </div>
  );
}
