import { Box, CircularProgress } from "@mui/material";

// 1. Context-dən API datalarını və yüklənmə statusunu çəkən hook
import { useProducts } from "../context/ProductContext.jsx";

// 2. Ana səhifə alt komponentləri
import HeroBanner from "./HeroBanner";
import CategoryBanners from "./CategoryBanners";
import ProductList from "./ProductList";
import PromoBanner from "./PromoBanner";
import JournalSection from "./JournalSection";

function Main() {
  // Context-dən məhsul massivini və yüklənmə vəziyyətini alırıq
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
  // (products hələ boş olarsa, xəta verməməsi üçün || [] təhlükəsizlik əlavə olunub)
  const bestSellers = (products || []).filter((item) =>
    item.collections?.includes("best-sellers")
  );

  // 2. Endirimdə olan məhsulları süzürük (oldPrice dəyəri mövcud olanlar)
  const saleProducts = (products || []).filter((item) => item.oldPrice !== null);

  return (
    <Box component="main" sx={{ width: "100%", overflowX: "hidden" }}>
      {/* 1. Əsas Hero Slayder/Banner */}
      <HeroBanner />

      {/* 2. Əsas Kateqoriyaların Vizual Blokları (Üz, Saç, Bədən və s.) */}
      <CategoryBanners />

      {/* 3. Ən Sevilən Bestseller Məhsulların Karuseli */}
      <ProductList
        title="Ən sevilənlər"
        products={bestSellers}
        viewAllPath="/collections/best-sellers"
        showAllText="HAMISINI GÖR"
      />

      {/* 4. Endirimli Məhsulların Karuseli */}
      <ProductList
        title="Xüsusi Təkliflər & Endirimlər"
        products={saleProducts}
        viewAllPath="/sale"
        showAllText="HAMISINI GÖR"
      />

      {/* 5. Reklam və Təklif Banneri */}
      <PromoBanner />

      {/* 6. Gözəllik Ritualı & Bloq/Jurnal Bölməsi */}
      <JournalSection />
    </Box>
  );
}

export default Main;