import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok əvəzi

const BEIGE = "#DAC0B1";
const BEIGE_LIGHT = "#f3e8e0";
const TEXT_DARK = "#3a2e2a";
const TEXT_LIGHT = "#6b5b52";

function Footer() {
  const shopLinks = [
    "Üz Baxımı",
    "Saç Baxımı",
    "Bədən Baxımı",
    "Ətirlər",
    "Makiyaj",
    "Yeni",
    "Endirimlər",
  ];

  const discoverLinks = [
    "Haqqımızda",
    "Gözəllik ritualı",
    "Beauty Journal",
    "Sustainability",
  ];

  const helpLinks = ["Çatdırılma", "Ödəniş", "Qaytarma", "FAQ", "Əlaqə"];

  return (
    <Box sx={{ bgcolor: TEXT_DARK, color: BEIGE_LIGHT, mt: 0 }}>
      {/* ===== ƏSAS FOOTER ===== */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(3, 1fr) 1.5fr 1.5fr",
            },
            gap: { xs: 4, md: 3 },
            alignItems: "flex-start",
          }}
        >
          {/* SHOP */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {shopLinks.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: "0.85rem",
                    color: `${BEIGE_LIGHT}99`,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* DISCOVER */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Discover
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {discoverLinks.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: "0.85rem",
                    color: `${BEIGE_LIGHT}99`,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* HELP */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Help
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {helpLinks.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: "0.85rem",
                    color: `${BEIGE_LIGHT}99`,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* LOGO + SLOGAN */}
          <Box sx={{ textAlign: { xs: "left", md: "center" } }}>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                letterSpacing: 4,
                color: BEIGE_LIGHT,
                lineHeight: 1,
              }}
            >
              LUMIÈRE
            </Typography>
            <Typography
              sx={{
                fontSize: "0.55rem",
                letterSpacing: 3,
                textTransform: "uppercase",
                color: `${BEIGE_LIGHT}80`,
                mt: 0.6,
                mb: 1.5,
              }}
            >
              Botanical Beauty
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: `${BEIGE_LIGHT}90`,
                lineHeight: 1.6,
                maxWidth: 200,
                mx: "auto",
              }}
            >
              Təbiətdən ilham alan gözəllik ritualınız.
            </Typography>

            {/* Sosial İkonlar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "center" },
                gap: 1,
                mt: 2,
              }}
            >
              {[InstagramIcon, FacebookIcon, PinterestIcon, MusicNoteIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    size="small"
                    sx={{
                      color: `${BEIGE_LIGHT}80`,
                      p: 0.6,
                      "&:hover": { color: BEIGE_LIGHT },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                )
              )}
            </Box>
          </Box>

          {/* QUOTE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              gridColumn: { xs: "span 2", md: "span 1" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: `${BEIGE_LIGHT}90`,
                lineHeight: 1.5,
                maxWidth: 220,
                textAlign: { xs: "left", md: "right" },
              }}
            >
              “Nature is not a place to visit, it is home.”
            </Typography>
          </Box>
        </Box>
      </Container>

      <Divider sx={{ bgcolor: `${BEIGE}20`, mx: { xs: 2, md: 6 } }} />

      {/* ===== ALT ZOLAQ ===== */}
      <Container maxWidth="xl" sx={{ py: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography sx={{ fontSize: "0.75rem", color: `${BEIGE_LIGHT}60` }}>
            © 2024 Lumière. Bütün hüquqlar qorunur.
          </Typography>

          {/* Linklər */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {["İstifadə şərtləri", "Məxfilik siyasəti"].map((text) => (
              <Typography
                key={text}
                sx={{
                  fontSize: "0.75rem",
                  color: `${BEIGE_LIGHT}60`,
                  cursor: "pointer",
                  "&:hover": { color: BEIGE_LIGHT },
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          {/* Dil seçimi */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {["AZ", "EN", "RU"].map((lang, i) => (
              <Typography
                key={lang}
                sx={{
                  fontSize: "0.75rem",
                  color: i === 0 ? BEIGE_LIGHT : `${BEIGE_LIGHT}60`,
                  cursor: "pointer",
                  fontWeight: i === 0 ? 500 : 400,
                  "&:hover": { color: BEIGE_LIGHT },
                }}
              >
                {lang}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;