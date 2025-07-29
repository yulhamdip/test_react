import React from "react";
import { MovementData } from "./types.ts";

type DataListProps = {
  data: MovementData[];
  selectedPoint: number | null;
  onPointSelect: (index: number | null) => void;
};

const DataList: React.FC<DataListProps> = ({
  data,
  selectedPoint,
  onPointSelect,
}) => {
  return (
    <ul className="data-list">
      {data.map((item, index) => (
        <li
          key={`${item.id}-${item.timestamp}`}
          className={`data-item ${selectedPoint === index ? "selected" : ""}`}
          onClick={() => onPointSelect(selectedPoint === index ? null : index)}
        >
          <div>
            <strong>{item.name}</strong>
          </div>
          <div className="coordinates">
            Position: ({item.x}, {item.y})
          </div>
          <div className="timestamp">
            {new Date(item.timestamp).toLocaleTimeString()}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DataList;
