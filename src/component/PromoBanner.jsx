import { Box, Container, Typography, Button } from "@mui/material";
import { NavLink } from "react-router";

const TEXT_DARK = "#2c221e";
const TEXT_LIGHT = "#705f56";

// Bura öz şəklinizin linkini və ya importunu qoyacaqsınız:
const PROMO_BG_IMAGE = "https://i.ibb.co/Q1dM7v9/promo-banner.webp";

function PromoBanner() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        my: { xs: 4, md: 6 },
        // Hündürlük daha kompakt və balanslı edildi:
        py: { xs: 6, sm: 8, md: 14 },
        backgroundImage: `url(${PROMO_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ŞƏFFAF VƏ TƏBİİ GRADIENT (Şəkli ağartmır, yalnız yazıların oxunmasına kömək edir) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(251,249,246,0.7) 0%, rgba(251,249,246,0.3) 45%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* DAXİLİ MƏZMUN */}
      <Container maxWidth={false} sx={{ px: { xs: 3, sm: 6, md: 10 }, position: "relative", zIndex: 2 }}>
        <Box sx={{ maxWidth: { xs: "100%", md: 500 }, textAlign: { xs: "center", md: "left" } }}>
          
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#8c6d58",
              fontWeight: 600,
              mb: 1.2,
            }}
          >
            Xüsusi Təklif
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TEXT_DARK,
              fontSize: { xs: "1.9rem", sm: "2.4rem", md: "2.9rem" },
              lineHeight: 1.15,
              fontWeight: 400,
              mb: 2,
            }}
          >
            Your little <br />
            beauty indulgence
          </Typography>

          <Typography
            sx={{
              color: TEXT_LIGHT,
              fontSize: "0.9rem",
              lineHeight: 1.6,
              mb: 3.5,
              maxWidth: 400,
              mx: { xs: "auto", md: 0 },
            }}
          >
            Təbii çiçək ekstraktları və efir yağları ilə zənginləşdirilmiş seçilmiş məhsullara 20%-dək xüsusi təklif.
          </Typography>

          <Button
            component={NavLink}
            to="/sale"
            sx={{
              bgcolor: TEXT_DARK,
              color: "#fff",
              px: 4,
              py: 1.2,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              borderRadius: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#4a3b34",
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

export default PromoBanner;