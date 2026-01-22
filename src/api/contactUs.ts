import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/config.axios";

export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}

const sendContactMessage = async (data: ContactMessage) => {
    const response = await axiosInstance.post("api/v1/contact-us", data);
    return response.data;
};

export const useContactUs = () => {
    return useMutation({
        mutationFn: sendContactMessage,
    });
};
