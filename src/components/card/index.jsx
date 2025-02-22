/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../rtk/Slices/cartSlice';
import { addToFavourite, removeFromFavourite } from '../../rtk/Slices/favouriteSlice';

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const isFavorited = favourites.some((item) => item.id === product.id);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isFavorited) {
      dispatch(removeFromFavourite(product.id));
    } else {
      dispatch(addToFavourite(product));
    }
  };

  return (
    <div className="col-12 col-md-4 col-lg-3">
      <div className={styles.card}>
        <Link to={`/furniture/${product.id}`} className={styles.link}>
          <img
            src={product.image}
            className={`${styles.cardimgtop} card-img-top`}
            alt={product.title}
          />
          <div className={styles.cardbody}>
            <h5 className={styles.cardtitle}>{product.title}</h5>
            <p className={styles.cardtext}>
              <span className={styles.oldprice}>${product.price * 2}</span>
              <span className={styles.price}>${product.price}</span>
            </p>

            {/* Icons Container */}
            <div className={styles.iconsContainer}>
                {/* Heart Icon */}
                <div className={styles.hearticon} onClick={handleAddToWishlist}>
                <i className={isFavorited ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
              </div>
              {/* Cart Icon */}
              <div className={styles.carticon} onClick={handleAddToCart}>
                <i className="bi bi-cart"></i>
              </div>

            
            </div>

          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
