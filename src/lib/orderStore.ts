// In-memory store for pending orders
// In production, use a database like Redis or PostgreSQL

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PendingOrder {
  reference: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  shippingCost: number;
  createdAt: Date;
  checkoutId?: string;
}

// Simple in-memory store (orders expire after 1 hour)
const pendingOrders = new Map<string, PendingOrder>();

export function storePendingOrder(order: PendingOrder): void {
  pendingOrders.set(order.reference, order);
  
  // Auto-cleanup after 1 hour
  setTimeout(() => {
    pendingOrders.delete(order.reference);
  }, 60 * 60 * 1000);
}

export function getPendingOrder(reference: string): PendingOrder | undefined {
  return pendingOrders.get(reference);
}

export function deletePendingOrder(reference: string): boolean {
  return pendingOrders.delete(reference);
}

export function getPendingOrderByCheckoutId(checkoutId: string): PendingOrder | undefined {
  const orders = Array.from(pendingOrders.values());
  return orders.find(order => order.checkoutId === checkoutId);
}
