// Comprehensive crop illustrations, benchmarks and visual characteristics
export const CROP_ICONS = {
  rice: "🌾",
  maize: "🌽",
  chickpea: "🧆",
  kidneybeans: "🫘",
  pigeonpeas: "🌿",
  mothbeans: "🌱",
  mungbean: "🥗",
  blackgram: "🥣",
  lentil: "🍲",
  pomegranate: "🫐",
  banana: "🍌",
  mango: "🥭",
  grapes: "🍇",
  watermelon: "🍉",
  muskmelon: "🍈",
  apple: "🍎",
  orange: "🍊",
  papaya: "🥑",
  coconut: "🥥",
  cotton: "🧶",
  jute: "🧵",
  coffee: "☕"
};

export const CROP_BENCHMARKS = {
  rice: { n: 90, p: 42, k: 43, temp: 23, hum: 82, ph: 6.5, rain: 230 },
  maize: { n: 77, p: 48, k: 20, temp: 22, hum: 65, ph: 6.2, rain: 84 },
  chickpea: { n: 40, p: 67, k: 80, temp: 19, hum: 17, ph: 7.3, rain: 80 },
  kidneybeans: { n: 20, p: 67, k: 20, temp: 20, hum: 21, ph: 5.7, rain: 105 },
  pigeonpeas: { n: 20, p: 67, k: 20, temp: 27, hum: 48, ph: 5.7, rain: 149 },
  mothbeans: { n: 21, p: 48, k: 20, temp: 28, hum: 53, ph: 6.8, rain: 51 },
  mungbean: { n: 21, p: 48, k: 20, temp: 28, hum: 85, ph: 6.7, rain: 48 },
  blackgram: { n: 40, p: 67, k: 19, temp: 30, hum: 65, ph: 7.1, rain: 67 },
  lentil: { n: 18, p: 68, k: 19, temp: 19, hum: 65, ph: 6.9, rain: 45 },
  pomegranate: { n: 18, p: 18, k: 40, temp: 22, hum: 90, ph: 6.4, rain: 107 },
  banana: { n: 100, p: 75, k: 50, temp: 27, hum: 80, ph: 6.0, rain: 104 },
  mango: { n: 20, p: 27, k: 30, temp: 31, hum: 50, ph: 5.8, rain: 94 },
  grapes: { n: 23, p: 132, k: 200, temp: 23, hum: 81, ph: 6.0, rain: 69 },
  watermelon: { n: 99, p: 17, k: 50, temp: 25, hum: 85, ph: 6.5, rain: 50 },
  muskmelon: { n: 100, p: 17, k: 50, temp: 28, hum: 92, ph: 6.3, rain: 24 },
  apple: { n: 20, p: 134, k: 199, temp: 22, hum: 92, ph: 5.9, rain: 112 },
  orange: { n: 20, p: 16, k: 10, temp: 23, hum: 92, ph: 7.0, rain: 110 },
  papaya: { n: 49, p: 59, k: 50, temp: 33, hum: 92, ph: 6.7, rain: 142 },
  coconut: { n: 21, p: 16, k: 30, temp: 27, hum: 94, ph: 5.9, rain: 175 },
  cotton: { n: 117, p: 46, k: 19, temp: 24, hum: 79, ph: 6.9, rain: 80 },
  jute: { n: 78, p: 46, k: 40, temp: 25, hum: 79, ph: 6.7, rain: 174 },
  coffee: { n: 101, p: 28, k: 30, temp: 25, hum: 58, ph: 6.7, rain: 158 }
};

export const FIELD_SPECS = [
  {
    id: "N",
    label: "Nitrogen (N)",
    unit: "kg/ha",
    min: 0,
    max: 200,
    step: 1,
    typical: "0 - 140",
    description: "Essential for vegetative leaf growth and green chlorophyll synthesis.",
    color: "emerald"
  },
  {
    id: "P",
    label: "Phosphorus (P)",
    unit: "kg/ha",
    min: 0,
    max: 180,
    step: 1,
    typical: "5 - 145",
    description: "Stimulates deep root development, flowering, and seed formation.",
    color: "blue"
  },
  {
    id: "K",
    label: "Potassium (K)",
    unit: "kg/ha",
    min: 0,
    max: 250,
    step: 1,
    typical: "5 - 205",
    description: "Enhances stress resilience, fruit size, sweetness, and disease resistance.",
    color: "amber"
  },
  {
    id: "temperature",
    label: "Temperature",
    unit: "°C",
    min: 5,
    max: 50,
    step: 0.1,
    typical: "10 - 45°C",
    description: "Ambient air temperature during active crop growth cycles.",
    color: "orange"
  },
  {
    id: "humidity",
    label: "Relative Humidity",
    unit: "%",
    min: 10,
    max: 100,
    step: 0.1,
    typical: "15 - 99%",
    description: "Moisture content in atmosphere affecting transpiration and fungal health.",
    color: "cyan"
  },
  {
    id: "ph",
    label: "Soil pH Level",
    unit: "pH",
    min: 3.5,
    max: 9.5,
    step: 0.1,
    typical: "5.0 - 8.5",
    description: "Acidity or alkalinity measure dictating soil nutrient availability.",
    color: "indigo"
  },
  {
    id: "rainfall",
    label: "Annual Rainfall",
    unit: "mm",
    min: 15,
    max: 400,
    step: 1,
    typical: "20 - 300 mm",
    description: "Expected seasonal precipitation supporting soil moisture reserves.",
    color: "teal"
  }
];

export const PRESET_SCENARIOS = [
  {
    name: "Tropical Monsoon Rice Paddy",
    desc: "High moisture, heavy rain, warm alluvial plain",
    values: { N: 90, P: 42, K: 43, temperature: 23.5, humidity: 82.0, ph: 6.5, rainfall: 220 }
  },
  {
    name: "Subtropical Apple Orchard",
    desc: "Cool temperature, balanced soils, high phosphorus and potassium",
    values: { N: 20, P: 135, K: 198, temperature: 21.5, humidity: 92.0, ph: 6.0, rainfall: 110 }
  },
  {
    name: "Arid Semi-Dry Pulses (Chickpea)",
    desc: "Low humidity, cool dry winter, high alkaline clay loam",
    values: { N: 40, P: 67, K: 80, temperature: 18.5, humidity: 17.0, ph: 7.3, rainfall: 78 }
  },
  {
    name: "Coastal Plantation (Coconut / Banana)",
    desc: "Humid coast, high rainfall, warm tropical breeze",
    values: { N: 100, P: 75, K: 50, temperature: 27.0, humidity: 80.0, ph: 6.2, rainfall: 120 }
  }
];
