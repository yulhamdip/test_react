import React from "react";
import { MapDimensions } from "./types";

type GridProps = {
  mapDimensions: MapDimensions;
  gridSpacing?: number;
};

const Grid: React.FC<GridProps> = ({ mapDimensions, gridSpacing = 40 }) => {
  const gridLines: React.ReactElement[] = [];

  // Vertical lines
  for (let i = 0; i <= mapDimensions.width; i += gridSpacing) {
    gridLines.push(
      <div
        key={`v-${i}`}
        className="grid-line-vertical"
        style={{ left: `${i}px` }}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= mapDimensions.height; i += gridSpacing) {
    gridLines.push(
      <div
        key={`h-${i}`}
        className="grid-line-horizontal"
        style={{ top: `${i}px` }}
      />
    );
  }

  return <div className="coordinate-grid">{gridLines}</div>;
};

export default Grid;
