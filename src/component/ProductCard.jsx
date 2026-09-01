import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useShop } from "../provider/ShopProvider";

function ProductCard({ product, columnsCount = 4 }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const shop = useShop();

  if (!product) return null;

  // 5 sütunlu düzülüşü aşkar edirik (ölçüləri avtomatik uyğunlaşdırmaq üçün)
  const isFiveCols = columnsCount === 5;
  const favorites = shop.favorites || [];
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  // 1. FAVORİTƏ ƏLAVƏ / ÇIXARMA (Detallar səhifəsinə keçidi saxlayır)
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (shop.toggleFavorite) {
      shop.toggleFavorite(product);
    } else if (isFavorite && shop.removeFromFavorites) {
      shop.removeFromFavorites(product.id);
    } else if (!isFavorite && shop.addToFavorites) {
      shop.addToFavorites(product);
    }
  };

  // 2. MƏHSUL DETALLARI SƏHİFƏSİNƏ KEÇİD
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // 3. ENDİRİM FAİZİNİN DƏQİQ HESABLANMASI
  const discountPercent =
    product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        bgcolor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #f0e8e2",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Bütün kartların eyni hündürlükdə düzülməsi üçün
        boxSizing: "border-box",
        // 5 sütunda kartın daxili boşluğunu yüngülləşdiririk
        p: isFiveCols ? 1.2 : 1.8,
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 10px 25px rgba(44,34,30,0.08)",
          transform: "translateY(-3px)",
          borderColor: "#e3d5ca",
        },
      }}
    >
      {/* ========================================================================= */}
      {/* 1. ŞƏKİL VƏ BADGELƏR BÖLMƏSİ */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1", // 1:1 Kvadrat proporsional şəkil qutusu
          bgcolor: "#f9f6f3",
          borderRadius: "6px",
          overflow: "hidden",
          mb: 1.5,
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        {/* SOL ÜST: YENİ VƏ ENDİRİM NİŞANLARI */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            alignItems: "flex-start",
            zIndex: 2,
          }}
        >
          {/* YENİ NİŞANI */}
          {product.isNew && (
            <Box
              sx={{
                bgcolor: "#205c22", // Təsdiqlənmiş zərif yaşıl ton
                color: "#ffffff",
                fontSize: isFiveCols ? "0.6rem" : "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                px: 0.9,
                py: 0.3,
                borderRadius: "3px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
              }}
            >
              YENİ
            </Box>
          )}

          {/* ENDİRİM NİŞANI */}
          {discountPercent && (
            <Box
              sx={{
                bgcolor: "#910e04", // Təsdiqlənmiş zərif qırmızı ton
                color: "#ffffff",
                fontSize: isFiveCols ? "0.6rem" : "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3px",
                px: 0.9,
                py: 0.3,
                borderRadius: "3px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
              }}
            >
              -{discountPercent}%
            </Box>
          )}
        </Box>

        {/* SAĞ ÜST: FAVORİT ÜRƏK DÜYMƏSİ */}
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            p: 0.6,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease",
            "&:hover": { bgcolor: "#ffffff", transform: "scale(1.1)" },
            zIndex: 2,
          }}
        >
          {isFavorite ? (
            <FavoriteIcon
              sx={{
                fontSize: isFiveCols ? "16px" : "18px",
                color: "#9c0a06", // Təsdiqlənmiş favorit qırmızısı
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                fontSize: isFiveCols ? "16px" : "18px",
                color: "#4a3b34",
              }}
            />
          )}
        </IconButton>
      </Box>

      {/* ========================================================================= */}
      {/* 2. KATEQORİYA VƏ MƏHSUL ADI */}
      {/* ========================================================================= */}
      <Typography
        sx={{
          fontSize: isFiveCols ? "0.6rem" : "0.66rem",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: "#998b82",
          fontWeight: 600,
          mb: 0.4,
        }}
      >
        {product.category}
      </Typography>

      <Typography
        sx={{
          fontSize: isFiveCols ? "0.82rem" : "0.9rem",
          fontWeight: 600,
          color: "#2c221e",
          lineHeight: 1.3,
          minHeight: "2.6em", // Məhsul adları qısa olsa belə hündürlük bərabər qalır
          mb: 0.8,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.name}
      </Typography>

      {/* ========================================================================= */}
      {/* 3. REYTİNQ BÖLMƏSİ */}
      {/* ========================================================================= */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
        <StarIcon sx={{ fontSize: isFiveCols ? "13px" : "15px", color: "#c5a894" }} />
        <Typography
          sx={{
            fontSize: isFiveCols ? "0.72rem" : "0.78rem",
            fontWeight: 600,
            color: "#2c221e",
          }}
        >
          {product.rating || "4.8"}
        </Typography>
        <Typography
          sx={{
            fontSize: isFiveCols ? "0.68rem" : "0.72rem",
            color: "#998b82",
          }}
        >
          ({product.reviewsCount || "85"})
        </Typography>
      </Box>

      {/* ========================================================================= */}
      {/* 4. QİYMƏT BLOKU */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.8,
          mb: 1.5,
          mt: "auto", // Qiyməti və düymələri kartın ən aşağısına bərabər hizalayır
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#2c221e",
            fontSize: isFiveCols ? "0.92rem" : "1.02rem",
          }}
        >
          {Number(product.price).toFixed(2)} AZN
        </Typography>
        {product.oldPrice && (
          <Typography
            sx={{
              textDecoration: "line-through",
              color: "#a89c94",
              fontSize: isFiveCols ? "0.72rem" : "0.78rem",
            }}
          >
            {Number(product.oldPrice).toFixed(2)} AZN
          </Typography>
        )}
      </Box>

      
      {/* ========================================================================= */}
      {/* 5. SAY SEÇİCİ VƏ SƏBƏT DÜYMƏSİ (4 və 5 Sütunda Tam Sığışan Zərif Quruluş) */}
      {/* ========================================================================= */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          flexDirection: isFiveCols ? "column" : { xs: "column", lg: "row" },//commit-1responsive cart pb
          mt: "auto",
          gap: 0.6,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Say Seçici (- 1 +) - Yığcam və rahat */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #e0d4cb",
            borderRadius: "4px",
            bgcolor: "#faf8f6",
            height: 32,
            width: isFiveCols ? "100%" : { xs: "100%", lg: "52px" }, // commit-1responsive cart pb
            flexShrink: 0,
            px: 0.8,
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              color: "#2c221e",
              padding: "0",// commit-1responsive cart pb
              lineHeight: 1,
            }}
          >
            −
          </button>
          <Typography
            sx={{
              fontSize: "0.76rem",
              fontWeight: 600,
              color: "#2c221e",
              userSelect: "none",
            }}
          >
            {quantity}
          </Typography>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              color: "#2c221e",
              padding: "0",// commit-1responsive cart pb
              lineHeight: 1,
            }}
          >
            +
          </button>
        </Box>

        {/* Səbətə Əlavə Et Düyməsi */}
        <Button
          fullWidth
          onClick={() => shop.addToCart && shop.addToCart(product, quantity)}
          sx={{
            bgcolor: "#241e1b",
            color: "#ffffff",
            fontSize: "0.64rem", 
            fontWeight: 600,
            letterSpacing: "0.3px", // Genişliyi yığcamlaşdırırıq
            textTransform: "uppercase",
            borderRadius: "4px",
            height: 32,
            px: 0.8,
            minWidth: 0,
            whiteSpace: "nowrap",
            boxShadow: "none",
            "&:hover": { bgcolor: "#3d322d", boxShadow: "none" },
            flexGrow: 1, // commit-1responsive cart pb
          }}
        >
          {isFiveCols ? "ƏLAVƏ ET" : "SƏBƏTƏ ƏLAVƏ ET"}
        </Button>
      </Box>
    </Box>
  );
}

export default ProductCard;