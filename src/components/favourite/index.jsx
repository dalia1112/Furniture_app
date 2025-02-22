import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./favourites.module.css";
import { removeFromFavourite } from "../../rtk/Slices/favouriteSlice";

const FavoriteItems = () => {
  const favorites = useSelector((state) => state.favourite);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromFavourite(id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorite items yet.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link to={`/furniture/${product.id}`} className={styles.link}>
                <img src={product.image} alt={product.title} className={styles.image} />
                
                {/* Title and Price in one row */}
                <div className={styles.infoContainer}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.price}>${product.price}</p>
                </div>
                
              </Link>
              <button className={styles.removeBtn} onClick={() => handleRemove(product.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteItems;

