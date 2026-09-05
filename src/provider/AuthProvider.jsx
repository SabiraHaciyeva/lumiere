import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // lazy initialization ile yerli bazadan istifadecileri yukleyirik
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("lumiere_users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // aktiv sessiyada olan istifadecini yukleyirik
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lumiere_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // bazani localStorage ile avtomatik sinxron saxlayir
  useEffect(() => {
    localStorage.setItem("lumiere_users", JSON.stringify(users));
  }, [users]);

  // aktiv sessiyani localStorage ile idare edir
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("lumiere_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("lumiere_current_user");
    }
  }, [currentUser]);

  // enenevi qeydiyyat funksiyasi
  const register = (fullName, email, password) => {
    // email artiq AuthModal-da temizlenib (cleanEmail olaraq gelir)
    const exists = users.some((u) => u.email === email);

    if (exists) {
      return { success: false, message: "Bu e-poct unvani ile artiq hesab movcuddur." };
    }

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      password,
      phone: "",
      address: "",
      createdAt: new Date().toLocaleDateString("az-AZ"),
      orders: [],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  // enenevi giris funksiyasi
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, message: "E-poct ve ya shifre yalnisdir." };
    }

    setCurrentUser(user);
    return { success: true };
  };

  // real google autentifikasiyasi (firebase popup)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const realGoogleUser = {
        id: user.uid,
        fullName: user.displayName || "Google Istifadecisi",
        email: user.email,
        avatar: user.photoURL || "",
        phone: user.phoneNumber || "",
        address: "",
        createdAt: new Date().toLocaleDateString("az-AZ"),
        orders: [],
      };

      const existingUser = users.find((u) => u.email === realGoogleUser.email);
      if (!existingUser) {
        setUsers((prev) => [...prev, realGoogleUser]);
      }

      setCurrentUser(existingUser || realGoogleUser);
      return { success: true };
    } catch (error) {
      console.error("Google giris xetasi:", error);
      return { success: false, message: "Google ile giris ugursuz oldu." };
    }
  };

  // sistemden cixis
  const logout = () => {
    setCurrentUser(null);
  };

  // profil melumatlarinin yenilenmesi
  const updateProfile = (updatedData) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);

    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook: Context xaricinde istifade olunarsa deqiq xeberdarliq edir
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook-u yalniz AuthProvider daxilinde istifade edilmelidir.");
  }
  return context;
}