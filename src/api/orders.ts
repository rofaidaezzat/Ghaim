import { axiosInstance } from "../config/config.axios";

export interface OrderVariation {
    quantity: number;
    size: string;
    color: string;
    note?: string;
}

export interface OrderItem {
    product: string;
    variations: OrderVariation[];
}

export interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

export interface ShippingAddress {
    city: string;
    district: string;
    details: string;
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
    data: CreateOrderPayload & { _id?: string };
}



export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await axiosInstance.post<CreateOrderResponse>("api/v1/orders", payload);
    return response.data;
};
