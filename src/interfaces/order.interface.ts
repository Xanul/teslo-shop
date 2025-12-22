import { Size } from "./product.interface";

export interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export interface OrderAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string | null;
    postalCode: string;
    city: string;
    state: string;
    phone: string;
    country: string;
}

export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    size: Size;
    productId: string;
    orderId: string;
}

export interface Order {
    id: string;
    subTotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    isPaid: boolean;
    paidAt?: Date | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface OrderTotals {
    subTotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
}