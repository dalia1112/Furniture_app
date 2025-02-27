import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToggleTheme } from "../../rtk/Slices/themeslice";
import styles from './header.module.css'
import { logout } from "../../rtk/Slices/AuthSlice";


function Header() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.themeLanguage);
  const buttonClass = `btn btn-${theme === "light" ? "light" : "dark"}`;
  const { cartItems } = useSelector((state) => state.cart);
  const {isAuthenticated} =useSelector((state)=>state.auth)

  const routes = [
    { link: "Home", path: "/" },
    { link: "Furniture", path: "/furniture" },
    { link: "Contact", path: "/contact" },
    { link: "SignUp", path: "/signup" },
  ];

  return (
    <nav className={`  navbar navbar-expand-lg navbar-${theme} bg-${theme} `}>
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/">
          Furniture
        </NavLink>

        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items (Links + Buttons) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links */}
          <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll">
            {routes.map(({ link, path }) => (
              <li className="nav-item mx-3" key={path}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  to={path}
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-2 mt-lg-0 align-items-center">
          
            <NavLink to="/favourite" className={`${buttonClass} position-relative `}>
            <i className="bi bi-suit-heart fs-4"></i>
        
            </NavLink>

            {/* Cart Icon with Badge */}
            <NavLink to="/cart" className={`${buttonClass} position-relative `}>
              <i className="bi bi-cart fs-5 "></i>
              {cartItems.length > 0 && (
                <span className={`${styles.cartBadge} position-absolute top-15 start-80 translate-middle badge rounded-pill bg-danger`}>
                  {cartItems.length}
                </span>
              )}
            </NavLink>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(ToggleTheme())}
              className={buttonClass}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <i className="bi bi-brightness-high-fill fs-4"></i>
              ) : (
                <i className="bi bi-moon-stars fs-4"></i>
              )}
            </button>
            <button
            onClick={() => dispatch(logout())}
            className={buttonClass}
            >
              {isAuthenticated?<i className="bi bi-box-arrow-left"></i>: <i className="bi bi-box-arrow-right"></i>}
            
            
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

