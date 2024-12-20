// components/Cart.js

import useStore from "./usestore";


function Cart() {
  const cart = useStore((state) => state.cart);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((cartItem) => (
          <div key={cartItem.cartId} className="border-b py-2">
            <p>{cartItem.name} - ${cartItem.price} x {cartItem.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
