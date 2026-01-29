// Mapping of cities to their shipping rates based on the provided sheet
export const SHIPPING_RATES: Record<string, number> = {
    "Alexandria": 50,
    "Cairo": 100,
    "Giza": 100,
    "Beheira": 80,
    "Damanhur": 90,
    "Sharqia": 120,

    // Canal Cities
    "Port Said": 130,
    "Ismailia": 130,
    "Suez": 130,

    // Delta Cities
    "Al-Mansura": 140,
    "Tanta": 140,
    "El-Mahalla El-Kubra": 140,
    "Damietta": 140,
    "Shibin El Kom": 140,
    "Banha": 140,
    "Kafr el-Sheikh": 140,
    "Mit Ghamr": 140,
    "Desouk": 140,

    // Middle/Upper Egypt
    "Beni Suef": 130,
    "Minya": 140,
    "Sohag": 150,

    // Deep Upper Egypt (160/170 range - favoring 170 for coverage or split if needed)
    "Qena": 160,
    "Luxor": 170,
    "Aswan": 170,

    // Red Sea / Sinai
    "Hurghada": 180,
    "Ain Sokhna": 160,
    "Sharm El Sheikh": 180,
    "Arish": 180,

    // Coast
    "Sahel": 80,
    "Marsa Matruh": 85
};

export const getShippingCost = (city: string): number => {
    if (!city) return 0;
    return SHIPPING_RATES[city] || 0; // Return 0 if not found so we can detect invalid selection if needed, or default
};
