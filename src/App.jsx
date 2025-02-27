import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import AllRoutes from "./components/Routes";
import Footer from "./components/Footer/footer";


function App() {
  const { theme } = useSelector((state) => state.themeLanguage);

  return (
    <div className={`app-container ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
      <div className="main-content">
        <div className="container">
          <Header />
          <AllRoutes />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

