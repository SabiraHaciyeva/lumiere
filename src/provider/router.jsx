import { createBrowserRouter, Navigate } from "react-router";

// Əsas struktur və komponentlər
import App from "../component/App";
import Main from "../component/main";
import Favorites from "../component/Favorites";

// Səhifələr (Dinamik filtrasiya səhifəsi)
import ShopPage from "../pages/ShopPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 1. Ana səhifəyə daxil olanda birbaşa /main yoluna yönləndirir
      {
        path: "/",
        element: <Navigate to="/main" />,
      },
      // 2. Əsas vitrin səhifəsi (Hero, karusellər, bannerlər)
      {
        path: "/main",
        element: <Main />,
      },
      // 3. Seçilmişlər (Favorilər) səhifəsi
      {
        path: "/favorites",
        element: <Favorites />,
      },
      // 4. Əsas kateqoriya yolları: /face, /body, /sale, /new, /collections
      {
        path: "/:category",
        element: <ShopPage />,
      },
      // 5. Alt kateqoriya yolları: /face/serums, /collections/summer, /hair/shampoos
      {
        path: "/:category/:subCategory",
        element: <ShopPage />,
      },
    ],
  },
]);

export default router;