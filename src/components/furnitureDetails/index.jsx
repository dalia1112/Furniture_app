/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./FurnitureDetails.module.css";
import { addToCart } from "../../rtk/Slices/cartSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const FurnitureDetails = ({ product }) => {
  const dispatch=useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth); 
  const navigate=useNavigate()
  const handleAddToCart =()=>{

        if (!isAuthenticated) {
          // Redirect to login page if not authenticated
          toast.error('Please log in to add items to your cart.', {
            position: 'top-center',
            toastId: 'login-toast',
            
          });
          navigate('/login');
        
        } else {
          // Add item to cart if authenticated
          dispatch(addToCart(product));
          toast.success('Product added to Cart!', {
            position: 'top-center',
            toastId: `cart-toast-${product.id}`,
            autoClose: 1000,
          });
        }
    
  }
  
  return (
    <div className={styles.container}>
        <ToastContainer
        autoClose={1000} // Auto-close all toasts after 1 second
        limit={1} // Limit the number of toasts to 1
      />
      <div className={styles.imageContainer}> 
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p> {/* Added $ symbol for better UI */}
        <button className={styles.button} onClick={handleAddToCart }>Add To Cart</button>
      </div>
    </div>
  );
};

export default FurnitureDetails;
