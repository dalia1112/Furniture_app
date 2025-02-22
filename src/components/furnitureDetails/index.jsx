/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import styles from "./FurnitureDetails.module.css";
import { addToCart } from "../../rtk/Slices/cartSlice";

const FurnitureDetails = ({ product }) => {
  const dispatch=useDispatch()
  
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}> 
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p> {/* Added $ symbol for better UI */}
        <button className={styles.button} onClick={() => dispatch(addToCart(product))}>Add To Cart</button>
      </div>
    </div>
  );
};

export default FurnitureDetails;
