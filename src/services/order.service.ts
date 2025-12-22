import { ProductToOrder } from "@/interfaces";
import { OrderRepository } from "@/repositories";



export class OrderService {
  constructor(private repository: OrderRepository) {}

  
  

}

const orderRepository = new OrderRepository();
export const orderService = new OrderService(orderRepository);