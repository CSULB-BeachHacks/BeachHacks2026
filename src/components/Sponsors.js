import React from "react";

// sprite sheets (keep the exact filenames/casing you showed)
import squareSet1 from "../assets/Square_set1.png";
import squareSet2 from "../assets/Square_set2.png";
import squareSet3 from "../assets/Square_set3.png";

// section background (the grainy/rainbow svg you already have in /public)
import "./Sponsors.css";

const pixelSponsors = [
  { id: 1, name: "Sponsor 1" },
  { id: 2, name: "Sponsor 2" },
  { id: 3, name: "Sponsor 3" },
  { id: 4, name: "Sponsor 4" },
  { id: 5, name: "Sponsor 5" },
  { id: 6, name: "Sponsor 6" },
  { id: 7, name: "Sponsor 7" },
];

// Pick the right frame from each 3-wide sprite sheet
const getCardStyle = (index) => {
  if (index < 3) {
    const frame = index % 3; // 0,1,2
    return {
      backgroundImage: `url(${squareSet1})`,
      backgroundSize: "300% 100%",
      backgroundPosition: `${frame * 50}% 0`,
      backgroundRepeat: "no-repeat",
      imageRendering: "pixelated",
    };
  }
  if (index < 6) {
    const frame = index % 3; // 0,1,2
    return {
      backgroundImage: `url(${squareSet2})`,
      backgroundSize: "300% 100%",
      backgroundPosition: `${frame * 50}% 0`,
      backgroundRepeat: "no-repeat",
      imageRendering: "pixelated",
    };
  }
  // last, single frame
  return {
    backgroundImage: `url(${squareSet3})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
  };
};

export default function Sponsors() {
  return (
    <section className="bhx-section" id="sponsors">
      <div className="bhx-inner">
        <h2 className="bhx-title">Sponsors</h2>

        <div className="bhx-grid">
          {pixelSponsors.slice(0, 6).map((s, i) => (
            <div key={s.id} className="bhx-card" style={getCardStyle(i)}>
              <div className="bhx-card-inner">
                <span className="bhx-label">{s.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bhx-lastrow">
          <div className="bhx-card bhx-card--single" style={getCardStyle(6)}>
            <div className="bhx-card-inner">
              <span className="bhx-label">{pixelSponsors[6].name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
