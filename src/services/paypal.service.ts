import { PayPalOrderStatusResponse } from "@/interfaces";
import { OrderRepository } from "@/repositories";

export class PayPalService {
  constructor(private repository: OrderRepository) {}

  async getPayPalBearerToken() {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL || "";

    const base64Token = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
      "utf-8"
    ).toString("base64");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(PAYPAL_OAUTH_URL, {
        ...requestOptions,
        cache: "no-store",
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async assignTransactionToOrder(orderId: string, transactionId: string) {
    return this.repository.setTransactionId(orderId, transactionId);
  }

  async verifyPaypalPayment(
    transactionId: string
  ): Promise<PayPalOrderStatusResponse | null> {
    const PAYPAL_ORDER_URL = process.env.PAYPAL_ORDERS_URL || "";
    const bearerToken = await this.getPayPalBearerToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(`${PAYPAL_ORDER_URL}/${transactionId}`, {
        ...requestOptions,
        cache: "no-store",
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const orderRepository = new OrderRepository();
export const paypalService = new PayPalService(orderRepository);
