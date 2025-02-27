import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../rtk/Slices/cartSlice";
import styles from "./cartItems.module.css";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          <h2 className={styles.cartTitle}>Your cart items</h2>
          <a href="/furniture" className={styles.backLink}>Back to shopping</a>

          <div className={styles.cartContent}>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className={styles.cartItem}>
                    <td className={styles.cartProduct}>
                      <img src={item.image} alt={item.title} className={styles.cartImage} />
                      <div className={styles.cartDetails}>
                        <h3>{item.title}</h3>
                        <button className={styles.removeBtn} onClick={() => dispatch(removeFromCart(item.id))}>
                          Remove
                        </button>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <div className={styles.quantityControl}>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.cartFooter}>
              <div className={styles.subtotal}>
                <p>Sub-total</p>
                <p>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
