import React from "react";
import { MovementData, MapDimensions } from "./types.ts";
import Grid from "./Grid.tsx";
import MovementPoint from "./MovementPoint.tsx";

type MovementMapProps = {
  data: MovementData[];
  selectedPoint: number | null;
  mapDimensions: MapDimensions;
  onPointSelect: (index: number | null) => void;
};

const MovementMap: React.FC<MovementMapProps> = ({
  data,
  selectedPoint,
  mapDimensions,
  onPointSelect,
}) => {
  return (
    <div className="movement-map">
      <Grid mapDimensions={mapDimensions} />

      {data.map((item, index) => (
        <MovementPoint
          key={`${item.id}-${item.timestamp}`}
          item={item}
          index={index}
          isSelected={selectedPoint === index}
          mapDimensions={mapDimensions}
          onClick={() => onPointSelect(selectedPoint === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default MovementMap;
