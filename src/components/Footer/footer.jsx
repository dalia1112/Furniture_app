import { Link } from "react-router-dom";
import styles from "./footer.module.css"; 

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        {/* About Section */}
        <div className={styles.about}>
          <p>Furniture App</p>
          <div className={styles.detail}>
            <p>We are a team of designers and developers that create high-quality Furniture websites.</p>
          </div>
        </div>

        {/* Account Section */}
        <div className={styles.account}>
          <h3>My Account</h3>
          <ul>
            <li>Account</li>
            <li><Link to="/cart" className={styles.link}>Order</Link></li>
            <li><Link to="/cart" className={styles.link}>Cart</Link></li>
            <li><Link to="/" className={styles.link}>Return</Link></li>
          </ul>
        </div>

        {/* Pages Section */}
        <div className={styles.page}>
          <h3>Pages</h3>
          <ul>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/about" className={styles.link}>About</Link></li>
            <li><Link to="/contact" className={styles.link}>Contact</Link></li>
            <li><Link to="/furniture" className={styles.link}>Gallery</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

