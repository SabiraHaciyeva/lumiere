import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

// MockAPI-dən aldığınız endpoint URL-i bura yazın:
const API_URL = "https://6a9467280e895b145e5f6e42.mockapi.io/v1/data";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API xətası:", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);