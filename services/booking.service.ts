import { QuoteDTO } from "@/models/order.model";
import { axiosInstance } from "./client";

export class BookingService {
  getQuote(params: QuoteDTO): Promise<any> {
    return axiosInstance.post<any>("/orders/ride/quote", params);
  }
}
