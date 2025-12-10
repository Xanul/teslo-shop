import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CART_CONFIG } from "@/config";

interface CartState {
  cart: CartProduct[];

  // CRUD Operations
  addToCart: (product: CartProduct) => void;
  updateProductQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  removeProduct: (productId: string, size: string) => void;
  clearCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getSummaryInformation: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    shipping: number;
    totalPrice: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (
        productId: string,
        size: string,
        quantity: number
      ) => {
        const { cart } = get();

        if (quantity <= 0) {
          get().removeProduct(productId, size);
          return;
        }

        const updatedCart = cart.map((item) => {
          if (item.id === productId && item.size === size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCart });
      },
      removeProduct: (productId: string, size: string) => {
        const { cart } = get();

        const updatedCart = cart.filter((item) => !(item.id === productId && item.size === size))
        set({cart: updatedCart})

      },
      clearCart: () => {
        set({ cart: [] });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subTotal * CART_CONFIG.TAX_RATE;
        const shipping = subTotal >= CART_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CART_CONFIG.SHIPPING_COST;
        const totalPrice = subTotal + tax + shipping;
        return { totalItems, subTotal, tax, shipping, totalPrice };
      },
      getTotalItems: () => {
        const { cart } = get();
        const totalItems = cart.reduce(
          (acc, current) => acc + current.quantity,
          0
        );
        return totalItems;
      },
    }),
    { name: "shopping-cart" }
  )
);
