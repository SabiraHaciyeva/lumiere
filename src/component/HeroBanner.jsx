import { Box, Typography, Button, Container } from "@mui/material";
import { NavLink } from "react-router";

// Şəkli öz istədiyiniz Cloudinary və ya Unsplash linki ilə əvəz edə bilərsiniz
const HERO_BG = "https://i.ibb.co/TxMrx9DH/hero-banner.webp";

function HeroBanner() {
  return (
    <Box
      sx={{
        width: "100%",
        // 1. Artıq boşluq qalmaması üçün mt dəyərləri kiçildildi:
        mt: { xs: "60px", md: "75px", lg: "102px" },// 1. Artıq boşluq qalmaması üçün mt dəyərləri kiçildildi
        // 2. Kompakt və balanslı hündürlük:
        height: { xs: "380px", sm: "420px", md: "480px", lg: "500px" },
        position: "relative",
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        mb: { xs: 5, md: 7 },
      }}
    >
      {/* Tündləşdirici estetik qat */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(44,34,30,0.4) 0%, rgba(44,34,30,0.1) 60%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Mətnlər və Düymə */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, px: { xs: 3, sm: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 540 }}>
          <Typography
            sx={{
              color: "#e8ded8",
              fontSize: "0.75rem",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            Təbiətin zərif toxunuşu
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#ffffff",
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.15,
              fontWeight: 400,
              mb: 2,
            }}
          >
            Ritual of Beauty
          </Typography>

          <Typography
            sx={{
              color: "#f5eee8",
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              lineHeight: 1.6,
              mb: 3.5,
              maxWidth: 440,
            }}
          >
            Dərinizə və ruhunuza xüsusi qayğı göstərən botanik ekstraktlar və təbii tərkibli premium baxım vasitələri.
          </Typography>

          <Button
            component={NavLink}
            to="/collections/summer"
            sx={{
              bgcolor: "#ffffff",
              color: "#2c221e",
              px: 4,
              py: 1.2,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              borderRadius: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ebdcd1",
                transform: "translateY(-2px)",
              },
            }}
          >
            Kəşf Et
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroBanner;