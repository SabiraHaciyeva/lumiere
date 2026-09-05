import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
// 1. Lokalstorage-dən məlumatları oxumaq 
//favorit
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("lumiere_favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Favoritlər oxunarkən xəta baş verdi:", error);
      return [];
    }
  });
//sebet
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lumiere_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Səbət oxunarkən xəta baş verdi:", error);
      return [];
    }
  });

  // 2. LocalStorage-a məlumatları yazmaq

  //favorit
  useEffect(() => {
    try {
      localStorage.setItem("lumiere_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Favoritlər yaddaşa yazılarkən xəta:", error);
    }
  }, [favorites]);

  //sebet
  useEffect(() => {
    try {
      localStorage.setItem("lumiere_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Səbət yaddaşa yazılarkən xəta:", error);
    }
  }, [cart]);

  // 3. Favorit funksiyaları

  // Favoritlərdən silmək(sirf silmek)
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  // Favoritə əlavə etmək+silmek(icon)
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Favoritdə olan məhsulun sayını artırmaq
  const increaseFavoriteQuantity = (productId) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Favoritdə olan məhsulun sayını azaltmaq (minimum 1 qalır)
  const decreaseFavoriteQuantity = (productId) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) - 1),
            }
          : item
      )
    );
  };

  // 4. Sebət funksiyaları

  // Səbətə əlavə etmək (əgər varsa sayını artırır, yoxdursa yeni əlavə edir)
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(10, item.quantity + quantity),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(10, quantity),
        },
      ];
    });
  };

  // Səbətdəki məhsulun sayını 1 vahid artırmaq
  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(10, item.quantity + 1),
            }
          : item
      )
    );
  };

  // Səbətdəki məhsulun sayını 1 vahid azaltmaq (0 olarsa avtomatik silinir)
  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Məhsulu səbətdən tamamilə silmək
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Sifariş tamamlandıqda səbəti tam təmizləmək üçün funksiya
  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,

        // Favorit metodları
        toggleFavorite,
        removeFromFavorites,
        increaseFavoriteQuantity,
        decreaseFavoriteQuantity,

        // Səbət metodları
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}