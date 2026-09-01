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

  const isFiveCols = columnsCount === 5;
  const favorites = shop.favorites || [];
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  // 1. FAVORİTƏ ƏLAVƏ / ÇIXARMA
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

  // 3. ENDİRİM FAİZİ
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
        height: "100%",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        // Hər ölçüdə xalis yer buraxan elastik padding:
        p: { xs: 1, sm: 1.2, md: isFiveCols ? 1.2 : 1.5 },
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 10px 25px rgba(44,34,30,0.08)",
          transform: "translateY(-3px)",
          borderColor: "#e3d5ca",
        },
      }}
    >
      {/* 1. ŞƏKİL VƏ BADGELƏR */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          bgcolor: "#f9f6f3",
          borderRadius: "6px",
          overflow: "hidden",
          mb: 1.2,
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

        {/* Badgelər */}
        <Box
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            display: "flex",
            flexDirection: "column",
            gap: 0.4,
            alignItems: "flex-start",
            zIndex: 2,
          }}
        >
          {product.isNew && (
            <Box
              sx={{
                bgcolor: "#205c22",
                color: "#ffffff",
                fontSize: { xs: "0.55rem", sm: "0.62rem" },
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                px: 0.7,
                py: 0.2,
                borderRadius: "3px",
              }}
            >
              YENİ
            </Box>
          )}

          {discountPercent && (
            <Box
              sx={{
                bgcolor: "#910e04",
                color: "#ffffff",
                fontSize: { xs: "0.55rem", sm: "0.62rem" },
                fontWeight: 700,
                letterSpacing: "0.2px",
                px: 0.7,
                py: 0.2,
                borderRadius: "3px",
              }}
            >
              -{discountPercent}%
            </Box>
          )}
        </Box>

        {/* Favorit Düyməsi */}
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "rgba(255,255,255,0.9)",
            p: 0.5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            "&:hover": { bgcolor: "#ffffff", transform: "scale(1.08)" },
            zIndex: 2,
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ fontSize: { xs: "15px", sm: "17px" }, color: "#9c0a06" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: { xs: "15px", sm: "17px" }, color: "#4a3b34" }} />
          )}
        </IconButton>
      </Box>

      {/* 2. KATEQORİYA VƏ AD */}
      <Typography
        sx={{
          fontSize: { xs: "0.58rem", sm: "0.64rem" },
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          color: "#998b82",
          fontWeight: 600,
          mb: 0.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product.category}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "0.78rem", sm: "0.85rem", md: isFiveCols ? "0.82rem" : "0.88rem" },
          fontWeight: 600,
          color: "#2c221e",
          lineHeight: 1.25,
          minHeight: "2.5em",
          mb: 0.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.name}
      </Typography>

      {/* 3. REYTİNQ */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mb: 0.8 }}>
        <StarIcon sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "#c5a894" }} />
        <Typography sx={{ fontSize: { xs: "0.68rem", sm: "0.74rem" }, fontWeight: 600, color: "#2c221e" }}>
          {product.rating || "4.8"}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.64rem", sm: "0.7rem" }, color: "#998b82" }}>
          ({product.reviewsCount || "85"})
        </Typography>
      </Box>

      {/* 4. QİYMƏT */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.6, mb: 1.2, mt: "auto" }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: "#2c221e",
            fontSize: { xs: "0.84rem", sm: "0.95rem", md: isFiveCols ? "0.9rem" : "1rem" },
          }}
        >
          {Number(product.price).toFixed(2)} AZN
        </Typography>
        {product.oldPrice && (
          <Typography
            sx={{
              textDecoration: "line-through",
              color: "#a89c94",
              fontSize: { xs: "0.66rem", sm: "0.74rem" },
            }}
          >
            {Number(product.oldPrice).toFixed(2)} AZN
          </Typography>
        )}
      </Box>

      {/* 5. SAY SEÇİCİ VƏ SƏBƏT DÜYMƏSİ */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.6,
          width: "100%",
          alignItems: "center",
          mt: "auto",
        }}
      >
        {/* Say Seçici */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #e0d4cb",
            borderRadius: "4px",
            bgcolor: "#faf8f6",
            height: 28,
            width: "100%",
            flexShrink: 0,
            px: 0.8,
            boxSizing: "border-box",
          }}
        >
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: "#2c221e",
              padding: 0,
              lineHeight: 1,
            }}
          >
            −
          </button>
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#2c221e",
              userSelect: "none",
            }}
          >
            {quantity}
          </Typography>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: "#2c221e",
              padding: 0,
              lineHeight: 1,
            }}
          >
            +
          </button>
        </Box>

        {/* Səbətə Əlavə Et Düyməsi (Sıxılmayan və daşmayan elastik ölçü) */}
        <Button
          fullWidth
          onClick={() => shop.addToCart && shop.addToCart(product, quantity)}
          startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: { xs: "14px !important", sm: "15px !important" } }} />}
          sx={{
            bgcolor: "#241e1b",
            color: "#ffffff",
            fontSize: { xs: "0.62rem", sm: "0.66rem", md: isFiveCols ? "0.62rem" : "0.68rem" },
            fontWeight: 600,
            letterSpacing: "0.2px",
            textTransform: "uppercase",
            borderRadius: "4px",
            height: 32,
            px: 0.5,
            minWidth: 0,
            whiteSpace: "nowrap",
            boxShadow: "none",
            "& .MuiButton-startIcon": { mr: 0.5 },
            "&:hover": { bgcolor: "#3d322d", boxShadow: "none" },
          }}
        >
          SƏBƏTƏ AT
        </Button>
      </Box>
    </Box>
  );
}

export default ProductCard;