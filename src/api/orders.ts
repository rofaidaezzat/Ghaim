import { axiosInstance } from "../config/config.axios";

export interface OrderVariation {
    quantity: number;
    size: string;
    color: string;
}

export interface OrderItem {
    product: string;
    variations: OrderVariation[];
}

export interface UserInfo {
    name: string;
    email: string; // Added email as it is in the sample payload, though not in the form yet
}

export interface ShippingAddress {
    city: string;
    district: string;
    details: string;
    phone: string;
}

export interface CreateOrderPayload {
    userInfo: UserInfo;
    cartItems: OrderItem[];
    shippingAddress: ShippingAddress;
}

export interface CreateOrderResponse {
    status: string;
    code: number;
    message: string;
    data: any;
}

export interface ShippingPriceResponse {
    status: string;
    code: number;
    message: string;
    data: {
        priceBeforeVat: number;
        vat: number;
        priceAfterVat: number;
    };
}

export const getShippingPrice = async (city: string): Promise<ShippingPriceResponse> => {
    const response = await axiosInstance.get<ShippingPriceResponse>(`api/v1/orders/shipping-price`, {
        params: { city }
    });
    return response.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await axiosInstance.post<CreateOrderResponse>("api/v1/orders", payload);
    return response.data;
};
