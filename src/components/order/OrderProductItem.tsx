import { CheckoutProductItem } from "@/components";
import { CartProduct, Size } from "@/interfaces";

interface OrderProductItemProps {
  orderItem: {
    id: string;
    quantity: number;
    price: number;
    size: Size;
    product: {
      id: string;
      slug: string;
      title: string;
      ProductImage: { url: string }[];
    };
  };
}

export const OrderProductItem = ({ orderItem }: OrderProductItemProps) => {
  // Transfortmamos el producto
  const cartProduct: CartProduct = {
    id: orderItem.product.id,
    slug: orderItem.product.slug,
    title: orderItem.product.title,
    price: orderItem.price,
    quantity: orderItem.quantity,
    size: orderItem.size,
    image: orderItem.product.ProductImage[0]?.url || "placeholder.jpg",
  };

  return (
    <CheckoutProductItem product={cartProduct} quantity={orderItem.quantity} />
  );
};
