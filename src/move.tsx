import React, { useState, useEffect } from "react";
import { useMovementData } from "./MoveBenda/useMovementData.ts";
import ControlPanel from "./MoveBenda/ControlPanel.tsx";
import DataList from "./MoveBenda/DataList.tsx";
import MovementMap from "./MoveBenda/MovementMap.tsx";
import "./Move.css";
import { useAnimationControls, motion } from "framer-motion";

const Move = () => {
  const { data, loading, isAutoUpdate, handleRefresh, toggleAutoUpdate } =
    useMovementData();
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [mapDimensions] = useState({ width: 500, height: 300 });

  // Animation controls untuk berbagai efek
  const mapControls = useAnimationControls();
  const dataControls = useAnimationControls();

  // Animasi hanya untuk selection dan interaksi user, bukan auto-update
  // useEffect(() => {
  //   if (isAutoUpdate) {
  //     mapControls.start({
  //       scale: [1, 1.005, 1],
  //       transition: { duration: 0.3, ease: "easeInOut" }
  //     });
  //   }
  // }, [data, isAutoUpdate, mapControls]);

  // Animasi ketika toggle auto-update - dibuat lebih subtle
  useEffect(() => {
    dataControls.start({
      x: [0, 2, 0], // Dikurangi dari 5 jadi 2
      transition: { duration: 0.2, ease: "easeInOut" }, // Durasi dipercepat
    });
  }, [isAutoUpdate, dataControls]);

  const handlePointSelect = (index: number | null) => {
    setSelectedPoint(index);
    // Animasi ketika memilih point
    if (index !== null) {
      mapControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3, ease: "easeInOut" },
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedPoint(null);
    // Animasi reset ketika clear selection
    mapControls.start({
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    });
  };

  const handleRefreshWithAnimation = () => {
    // Animasi saat manual refresh
    dataControls.start({
      rotate: [0, 360],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    handleRefresh();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      className="move-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div className="data-section" animate={dataControls}>
        <ControlPanel
          isAutoUpdate={isAutoUpdate}
          onToggleAutoUpdate={toggleAutoUpdate}
          onRefresh={handleRefreshWithAnimation}
        />

        <DataList
          data={data}
          selectedPoint={selectedPoint}
          onPointSelect={handlePointSelect}
        />
      </motion.div>

      <motion.div className="map-section" animate={mapControls}>
        <h3>Movement Map</h3>

        <div className="map-controls">
          <motion.span
            style={{
              marginLeft: "1rem",
              color: isAutoUpdate ? "#4caf50" : "#f44336",
            }}
            animate={{
              color: isAutoUpdate ? "#4caf50" : "#f44336",
              scale: isAutoUpdate ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            ● {isAutoUpdate ? "Live Update" : "Static"}
          </motion.span>
        </div>

        <MovementMap
          data={data}
          selectedPoint={selectedPoint}
          mapDimensions={mapDimensions}
          onPointSelect={handlePointSelect}
        />
      </motion.div>
    </motion.div>
  );
};

export default Move;
