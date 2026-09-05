import { Box, CircularProgress } from "@mui/material";

import { useProducts } from "../context/ProductContext.jsx";

import HeroBanner from "./HeroBanner";
import CategoryBanners from "./CategoryBanners";
import ProductList from "./ProductList";
import PromoBanner from "./PromoBanner";
import JournalSection from "./JournalSection";

function Main() {
  // products loading
  const { products, loading } = useProducts();

  // API-dən məlumat hələ tam yüklənməyibsə, ekrana səliqəli spinner çıxarırıq
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          width: "100%",
        }}
      >
        <CircularProgress sx={{ color: "#8c7365" }} />
      </Box>
    );
  }

  // 1. Bestseller / Ən çox sevilən məhsulları süzürük
  const bestSellers = (products || []).filter((item) =>
    item.collections?.includes("best-sellers")
  );

  // 2. Sale / Endirimli məhsulları süzürük
  const saleProducts = (products || []).filter((item) => item.oldPrice !== null);

  return (
    <Box component="main" sx={{ width: "100%", overflowX: "hidden" }}>
      
      <HeroBanner />
      <CategoryBanners />
      <ProductList
        title="Ən sevilənlər"
        products={bestSellers}
        viewAllPath="/collections/best-sellers"
        showAllText="HAMISINI GÖR"
      />
      <ProductList
        title="Xüsusi Təkliflər & Endirimlər"
        products={saleProducts}
        viewAllPath="/sale"
        showAllText="HAMISINI GÖR"
      />

      <PromoBanner />

      <JournalSection />
    </Box>
  );
}

export default Main;