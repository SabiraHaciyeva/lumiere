import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("lumiere_users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lumiere_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("lumiere_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("lumiere_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("lumiere_current_user");
    }
  }, [currentUser]);

  // ƏNƏNƏVİ QEYDİYYAT (Ad, Soyad, Email, Parol ilə)
  const register = (fullName, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      return { success: false, message: "Bu e-poçt ünvanı ilə artıq hesab mövcuddur." };
    }

    const newUser = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      email: cleanEmail,
      password: password,
      phone: "",
      address: "",
      createdAt: new Date().toLocaleDateString("az-AZ"),
      orders: [],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  // ƏNƏNƏVİ GİRİŞ
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      return { success: false, message: "E-poçt və ya şifrə yanlışdır." };
    }

    setCurrentUser(user);
    return { success: true };
  };

  // =========================================================================
  // REAL GOOGLE GİRİŞİ (Statik Aysel adı silindi, real Gmail məlumatları gəlir)
  // =========================================================================
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const realGoogleUser = {
        id: user.uid,
        fullName: user.displayName || "Google İstifadəçisi",
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
      console.error("Google giriş xətası:", error);
      return { success: false, message: "Google ilə giriş uğursuz oldu." };
    }
  };

  // ÇIXIŞ
  const logout = () => {
    setCurrentUser(null);
  };

  // PROFİL MƏLUMATLARINI YENİLƏMƏ
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      currentUser: null,
      login: () => {},
      register: () => {},
      loginWithGoogle: () => {},
      logout: () => {},
      updateProfile: () => {},
    };
  }
  return context;
}

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [users, setUsers] = useState(() => {
//     try {
//       const saved = localStorage.getItem("lumiere_users");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   const [currentUser, setCurrentUser] = useState(() => {
//     try {
//       const saved = localStorage.getItem("lumiere_current_user");
//       return saved ? JSON.parse(saved) : null;
//     } catch {
//       return null;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("lumiere_users", JSON.stringify(users));
//   }, [users]);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem("lumiere_current_user", JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem("lumiere_current_user");
//     }
//   }, [currentUser]);

//   // QEYDİYYAT
//   const register = (fullName, email, password) => {
//     const cleanEmail = email.trim().toLowerCase();
//     const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);

//     if (exists) {
//       return { success: false, message: "Bu e-poçt ünvanı ilə artıq hesab mövcuddur." };
//     }

//     const newUser = {
//       id: Date.now(),
//       fullName: fullName.trim(),
//       email: cleanEmail,
//       password: password,
//       phone: "",
//       address: "",
//       createdAt: new Date().toLocaleDateString("az-AZ"),
//       orders: [],
//     };

//     setUsers((prev) => [...prev, newUser]);
//     setCurrentUser(newUser);
//     return { success: true };
//   };

//   // GİRİŞ
//   const login = (email, password) => {
//     const cleanEmail = email.trim().toLowerCase();
//     const user = users.find(
//       (u) => u.email.toLowerCase() === cleanEmail && u.password === password
//     );

//     if (!user) {
//       return { success: false, message: "E-poçt və ya şifrə yanlışdır." };
//     }

//     setCurrentUser(user);
//     return { success: true };
//   };

//   // GOOGLE İLƏ GİRİŞ (Simulyasiya)
//   const loginWithGoogle = () => {
//     const googleUser = {
//       id: Date.now(),
//       fullName: "Aysel Məmmədova",
//       email: "aysel.m@gmail.com",
//       phone: "+994 50 123 45 67",
//       address: "Bakı ş., Nizami küç. 45",
//       createdAt: new Date().toLocaleDateString("az-AZ"),
//       orders: [],
//     };

//     const exists = users.find((u) => u.email === googleUser.email);
//     if (!exists) {
//       setUsers((prev) => [...prev, googleUser]);
//     }
//     setCurrentUser(exists || googleUser);
//     return { success: true };
//   };

//   // ÇIXIŞ
//   const logout = () => {
//     setCurrentUser(null);
//   };

//   // YENİLƏNMƏ
//   const updateProfile = (updatedData) => {
//     if (!currentUser) return;

//     const updatedUser = { ...currentUser, ...updatedData };
//     setCurrentUser(updatedUser);

//     setUsers((prev) =>
//       prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
//     );
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         register,
//         login,
//         loginWithGoogle,
//         logout,
//         updateProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     return {
//       currentUser: null,
//       login: () => {},
//       register: () => {},
//       loginWithGoogle: () => {},
//       logout: () => {},
//       updateProfile: () => {},
//     };
//   }
//   return context;
// }