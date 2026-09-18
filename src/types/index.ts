export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tarteleta' | 'media' | 'grande';
  flavor: string;
  portions: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export type Flavor = 
  | 'verdura'
  | 'jamon-y-queso'
  | 'cebolla-y-queso'
  | 'zapallito'
  | 'capresse'
  | 'pollo'
  | 'espinaca'
  | 'choclo'
  | 'atun'
  | 'vegetales-mixtos'
  | 'brocoli-y-calabaza';

export type Size = 'tarteleta' | 'media' | 'grande';

export interface FlavorInfo {
  id: Flavor;
  name: string;
  image: string;
  description: string;
}
