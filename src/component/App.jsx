import { Routes, Route } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./main";
import ShopPage from "../pages/ShopPage";
import ProductDetail from "../pages/ProductDetail";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage"; // Qovluq yoluna uyğun tənzimlə
import { ProductProvider } from "../context/ProductContext";



function App() {
  return (
    <ProductProvider>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />

        <main style={{ flex: "1 0 auto" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/:category" element={<ShopPage />} />
            <Route path="/:category/:subCategory" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;