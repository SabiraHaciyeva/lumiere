import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // =========================================================================
  // 1. LOCALSTORAGE-DƏN İLKİN MƏLUMATLARIN OXUNMASI (Lazy Initial State)
  // =========================================================================
  
  // Sevimliləri LocalStorage-dən götürürük (yoxdursa boş massiv [])
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("lumiere_favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Favoritlər oxunarkən xəta baş verdi:", error);
      return [];
    }
  });

  // Səbəti LocalStorage-dən götürürük (yoxdursa boş massiv [])
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lumiere_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Səbət oxunarkən xəta baş verdi:", error);
      return [];
    }
  });

  // =========================================================================
  // 2. DƏYİŞİKLİKLƏRİN LOCALSTORAGE-Ə AVTOMATİK YAZILMASI
  // =========================================================================

  // Favoritlər hər dəfə dəyişəndə LocalStorage yenilənir
  useEffect(() => {
    try {
      localStorage.setItem("lumiere_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Favoritlər yaddaşa yazılarkən xəta:", error);
    }
  }, [favorites]);

  // Səbət hər dəfə dəyişəndə LocalStorage yenilənir
  useEffect(() => {
    try {
      localStorage.setItem("lumiere_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Səbət yaddaşa yazılarkən xəta:", error);
    }
  }, [cart]);

  // =========================================================================
  // 3. FAVORİT FUNKSİYALARI
  // =========================================================================

  // Favoritlərdən silmək
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  // Favoritə əlavə etmək və ya varsa çıxarmaq (Toggle)
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

  // =========================================================================
  // 4. SƏBƏT FUNKSİYALARI
  // =========================================================================

  // Səbətə əlavə etmək (əgər varsa sayını artırır, yoxdursa yeni əlavə edir)
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: quantity,
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
              quantity: item.quantity + 1,
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