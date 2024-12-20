// store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],

  addItemstoCart: (id, price, title) =>
    set((state) => {
      const existing = state.cart.find((item) => item.productId === id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.productId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        const newCartItem = {
          cartId: 'cart' + id,
          productId: id,
          name: title,
          price: price,
          quantity: 1,
        };
        return { cart: [...state.cart, newCartItem] };
      }
    }),
}));

export default useStore;
