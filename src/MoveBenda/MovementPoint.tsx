import React from "react";
import { MovementData, MapDimensions } from "./types.ts";
import { convertToMapCoordinates, getPointColor } from "./utils.ts";

type MovementPointProps = {
  item: MovementData;
  index: number;
  isSelected: boolean;
  mapDimensions: MapDimensions;
  onClick: () => void;
};

const MovementPoint: React.FC<MovementPointProps> = ({
  item,
  index,
  isSelected,
  mapDimensions,
  onClick,
}) => {
  const { mapX, mapY } = convertToMapCoordinates(item.x, item.y, mapDimensions);

  return (
    <React.Fragment>
      <div
        className={`movement-point ${isSelected ? "selected" : ""}`}
        style={{
          left: `${mapX}px`,
          top: `${mapY}px`,
          backgroundColor: getPointColor(index),
        }}
        onClick={onClick}
      />

      {isSelected && (
        <div
          className="movement-label"
          style={{
            left: `${mapX + 10}px`,
            top: `${mapY - 30}px`,
          }}
        >
          {item.name}
          <br />
          (X: {item.x}, Y: {item.y})
        </div>
      )}
    </React.Fragment>
  );
};

export default MovementPoint;
