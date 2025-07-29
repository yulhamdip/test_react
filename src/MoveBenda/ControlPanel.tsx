import React from "react";

type ControlPanelProps = {
  isAutoUpdate: boolean;
  onToggleAutoUpdate: () => void;
  onRefresh: () => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  isAutoUpdate,
  onToggleAutoUpdate,
  onRefresh,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <h2 style={{ color: "blue", fontSize: "24px", margin: 0 }}>
        Movement Data
      </h2>
      <div style={{ textAlign: "right" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <button
            className={`control-button ${isAutoUpdate ? "active" : ""}`}
            onClick={onToggleAutoUpdate}
          >
            {isAutoUpdate ? "⏸️ Stop Auto" : "▶️ Start Auto"}
          </button>
          <button
            className="control-button"
            onClick={onRefresh}
            style={{ marginLeft: "0.5rem" }}
          >
            🔄 Refresh
          </button>
        </div>
        <small style={{ color: "#666", fontSize: "12px" }}>
          {isAutoUpdate ? "Auto-updating every second" : "Manual mode"}
        </small>
      </div>
    </div>
  );
};

export default ControlPanel;
