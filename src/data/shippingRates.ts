// Mapping of cities to their shipping rates based on the provided sheet
export interface ShippingInfo {
    cost: number;
    deliveryTime: string;
}

export const SHIPPING_RATES: Record<string, ShippingInfo> = {
    "Alexandria": { cost: 50, deliveryTime: "24 H" },
    "Cairo": { cost: 100, deliveryTime: "48H" },
    "Giza": { cost: 100, deliveryTime: "48H" },
    "Beheira": { cost: 80, deliveryTime: "72H" },
    "Damanhur": { cost: 90, deliveryTime: "72H" },
    "Sharqia": { cost: 120, deliveryTime: "72H" },

    // Canal Cities
    "Port Said": { cost: 130, deliveryTime: "72H" },
    "Ismailia": { cost: 130, deliveryTime: "72H" },
    "Suez": { cost: 130, deliveryTime: "72H" },

    // Delta Cities
    "Al-Mansura": { cost: 140, deliveryTime: "72H" },
    "Tanta": { cost: 140, deliveryTime: "72H" },
    "El-Mahalla El-Kubra": { cost: 140, deliveryTime: "72H" },
    "Damietta": { cost: 140, deliveryTime: "72H" },
    "Shibin El Kom": { cost: 140, deliveryTime: "72H" },
    "Banha": { cost: 140, deliveryTime: "72H" },
    "Kafr el-Sheikh": { cost: 140, deliveryTime: "72H" },
    "Mit Ghamr": { cost: 140, deliveryTime: "72H" },
    "Desouk": { cost: 140, deliveryTime: "72H" },

    // Middle/Upper Egypt
    "Beni Suef": { cost: 130, deliveryTime: "3-4 days" },
    "Minya": { cost: 140, deliveryTime: "3-4 days" },
    "Sohag": { cost: 150, deliveryTime: "3-4 days" },

    // Deep Upper Egypt
    "Qena": { cost: 160, deliveryTime: "4-5 days" },
    "Luxor": { cost: 170, deliveryTime: "4-5 days" },
    "Aswan": { cost: 170, deliveryTime: "4-5 days" },

    // Red Sea / Sinai
    "Hurghada": { cost: 180, deliveryTime: "5-6 days" },
    "Ain Sokhna": { cost: 160, deliveryTime: "5-6 days" },
    "Sharm El Sheikh": { cost: 180, deliveryTime: "5-6 days" },
    "Arish": { cost: 180, deliveryTime: "5-6 days" },

    // Coast
    "Sahel": { cost: 80, deliveryTime: "2days" },
    "Marsa Matruh": { cost: 85, deliveryTime: "2days" }
};

export const getShippingCost = (city: string): number => {
    if (!city) return 0;
    return SHIPPING_RATES[city]?.cost || 0;
};

export const getDeliveryTime = (city: string): string => {
    if (!city) return "";
    return SHIPPING_RATES[city]?.deliveryTime || "";
};
