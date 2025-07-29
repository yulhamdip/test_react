import { MapDimensions } from './types';

// Konversi koordinat data ke koordinat map
export const convertToMapCoordinates = (
  x: number, 
  y: number, 
  mapDimensions: MapDimensions
) => {
  const mapX = (x / 100) * mapDimensions.width;
  const mapY = (y / 100) * mapDimensions.height;
  return { mapX, mapY };
};

// Generate warna untuk setiap point
export const getPointColor = (index: number): string => {
  const colors = [
    "#ff4444",
    "#44ff44",
    "#4444ff",
    "#ffaa44",
    "#ff44aa",
    "#44aaff",
  ];
  return colors[index % colors.length];
};