import { useState } from "react";
import { STATES, SEASONS } from "../data/vegetables";
import "./VeggieCard.css";

const SEASON_COLORS = {
  spring: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
  summer: { bg: "#fffbeb", text: "#92400e", dot: "#f59e0b" },
  autumn: { bg: "#fff7ed", text: "#9a3412", dot: "#f97316" },
  winter: { bg: "#eff6ff", text: "#1e40af", dot: "#3b82f6" },
};

const SEASON_EMOJIS = { spring: "🌸", summer: "☀️", autumn: "🍂", winter: "❄️" };

function SeasonBadge({ season }) {
  const colors = SEASON_COLORS[season] || {};
  return (
    <span
      className="season-badge"
      style={{ background: colors.bg, color: colors.text }}
    >
      <span className="season-dot" style={{ background: colors.dot }} />
      {SEASON_EMOJIS[season]} {season.charAt(0).toUpperCase() + season.slice(1)}
    </span>
  );
}

function StateRow({ stateCode, data, isHighlighted }) {
  const stateName = STATES.find((s) => s.code === stateCode)?.name || stateCode;
  return (
    <div className={`state-row${isHighlighted ? " highlighted" : ""}`}>
      <div className="state-name">{stateName}</div>
      <div className="state-seasons">
        <div className="season-group">
          <span className="season-group-label">Plant</span>
          <div className="badges">
            {data.plant.map((s) => <SeasonBadge key={s} season={s} />)}
          </div>
        </div>
        <div className="season-group">
          <span className="season-group-label">Harvest</span>
          <div className="badges">
            {data.harvest.map((s) => <SeasonBadge key={s} season={s} />)}
          </div>
        </div>
      </div>
      <p className="state-notes">{data.notes}</p>
    </div>
  );
}

export default function VeggieCard({ veg, selectedState, selectedSeason, expanded, onToggle }) {
  const [imgError, setImgError] = useState(false);

  const stateData = selectedState !== "ALL" ? veg.seasons[selectedState] : null;
  const highlightSeason = selectedSeason !== "ALL" ? selectedSeason : null;

  const isPlantSeason = stateData && highlightSeason && stateData.plant.includes(highlightSeason);
  const isHarvestSeason = stateData && highlightSeason && stateData.harvest.includes(highlightSeason);

  let seasonBanner = null;
  if (isPlantSeason && isHarvestSeason) {
    seasonBanner = { label: "Plant & Harvest Season", color: "#7c3aed" };
  } else if (isPlantSeason) {
    seasonBanner = { label: "Planting Season", color: "#16a34a" };
  } else if (isHarvestSeason) {
    seasonBanner = { label: "Harvest Season", color: "#d97706" };
  }

  const statesToShow = selectedState !== "ALL"
    ? [[selectedState, veg.seasons[selectedState]]]
    : Object.entries(veg.seasons);

  return (
    <div className={`card${expanded ? " expanded" : ""}`}>
      {seasonBanner && (
        <div className="season-banner" style={{ background: seasonBanner.color }}>
          {seasonBanner.label}
        </div>
      )}

      <div className="card-image-wrap">
        {!imgError ? (
          <img
            src={veg.image}
            alt={veg.name}
            className="card-image"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card-image-fallback">{veg.emoji}</div>
        )}
        <span className="card-emoji-overlay">{veg.emoji}</span>
      </div>

      <div className="card-body">
        <h2 className="card-title">{veg.name}</h2>
        <p className="card-desc">{veg.description}</p>

        {stateData && !expanded && (
          <div className="quick-info">
            <div className="quick-row">
              <span className="quick-label">🌱 Plant</span>
              <div className="badges">
                {stateData.plant.map((s) => <SeasonBadge key={s} season={s} />)}
              </div>
            </div>
            <div className="quick-row">
              <span className="quick-label">🌾 Harvest</span>
              <div className="badges">
                {stateData.harvest.map((s) => <SeasonBadge key={s} season={s} />)}
              </div>
            </div>
            <p className="quick-notes">{stateData.notes}</p>
          </div>
        )}

        <button className="expand-btn" onClick={onToggle}>
          {expanded ? "Show less ↑" : (selectedState !== "ALL" ? "All states ↓" : "State guide ↓")}
        </button>

        {expanded && (
          <div className="expanded-content">
            <h3 className="expanded-title">Growing Guide by State</h3>
            {statesToShow.map(([code, data]) => (
              <StateRow
                key={code}
                stateCode={code}
                data={data}
                isHighlighted={code === selectedState && selectedState !== "ALL"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
