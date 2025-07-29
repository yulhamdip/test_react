// Data awal sebagai template
const initialData = [
    { id: 1, name: "Bola", x: 10, y: 20 },
    { id: 2, name: "Kotak", x: 15, y: 25 },
    { id: 3, name: "Segitiga", x: 20, y: 30 },
    { id: 4, name: "baju", x: 12, y: 22 },
    { id: 5, name: "Kotak", x: 18, y: 28 },
    { id: 6, name: "Segitiga", x: 25, y: 35 },
    { id: 7, name: "Bola", x: 30, y: 40 },
    { id: 8, name: "Baju", x: 35, y: 45 },
    { id: 9, name: "Kotak", x: 40, y: 50 },
    { id: 10, name: "Segitiga", x: 45, y: 55 }
];

// Fungsi untuk generate movement random
const generateRandomMovement = (currentValue, min = 5, max = 95) => {
    const change = (Math.random() - 0.5) * 10; // Random antara -5 hingga +5
    const newValue = currentValue + change;
    
    // Pastikan nilai tetap dalam batas
    if (newValue < min) return min;
    if (newValue > max) return max;
    return Math.round(newValue * 10) / 10; // Round ke 1 decimal
};

// Fungsi untuk mendapatkan data movement yang berubah
export const getMockMovements = () => {
    const now = new Date();
    
    return initialData.map((item, index) => {
        // Buat seed berdasarkan waktu dan id untuk konsistensi
        const timeSeed = Math.floor(now.getTime() / 1000); // Update setiap detik
        const xSeed = (timeSeed + item.id * 10) % 100;
        const ySeed = (timeSeed + item.id * 15) % 100;
        
        // Gunakan sin/cos untuk movement yang smooth
        const xOffset = Math.sin(timeSeed * 0.01 + item.id) * 20;
        const yOffset = Math.cos(timeSeed * 0.01 + item.id) * 15;
        
        const newX = Math.max(5, Math.min(95, item.x + xOffset));
        const newY = Math.max(5, Math.min(95, item.y + yOffset));
        
        return {
            ...item,
            x: Math.round(newX * 10) / 10,
            y: Math.round(newY * 10) / 10,
            timestamp: now.toISOString()
        };
    });
};

// Export untuk backward compatibility
export const mockMovements = getMockMovements();