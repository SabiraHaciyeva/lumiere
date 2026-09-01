import { Link } from "react-router";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const BEIGE = "#DAC0B1";
const BEIGE_LIGHT = "#f3e8e0";
const TEXT_DARK = "#3a2e2a";

const shopLinks = [
  { label: "Üz Baxımı", path: "/face" },
  { label: "Saç Baxımı", path: "/hair" },
  { label: "Bədən Baxımı", path: "/body" },
  { label: "Ətirlər", path: "/fragrance" },
  { label: "Makiyaj", path: "/makeup" },
  { label: "Yeni Gələnlər", path: "/new" },
  { label: "Endirimlər", path: "/sale" },
];

const discoverLinks = [
  { label: "Haqqımızda", path: "/about" },
  { label: "Ən Çox Satılanlar", path: "/collections/best-sellers" },
  { label: "Xüsusi Təkliflər", path: "/sale" },
  { label: "Yeni Gələnlər", path: "/new" },
];

const helpLinks = [
  { label: "Müştəri Dəstəyi (WhatsApp)", href: "https://wa.me/994513546191", isExternal: true },
  { label: "E-poçt ilə Əlaqə", href: "mailto:sabira.haciyeva2007@gmail.com", isExternal: true },
  { label: "Çatdırılma və Qaydalar", path: "/about#delivery", isExternal: false },
];

const socialLinks = [
  { icon: InstagramIcon, href: "https://www.instagram.com/haciyeva_sabira?igsi=MThlNGdpZ2c2MjYy" },
  { icon: FacebookIcon, href: "https://www.google.com/search?sca_esv=19477e370b385ecc&sxsrf=APpeQnvC1zdOsWm7EVlfBwf6IP6ly920Bw:1788283050593&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832a9BVCEiB2iPJNekNderQwJGZIG7YID1eBGNWasq2rzBIURiSCrdR156KVg_RXap7nymj7qwomXHj_SiILyyw7QFSHB4HN7nQAWqvV6F5ky9MYo0xZdIijc6pBycbLSLZWgMMIa3s4ULJqrsZAQpfvDo1Dg8Ui6w2RVnWfTfILIjp8E4XQ&q=i+dont+have+one&sa=X&ved=2ahUKEwjN3_O_8c2WAxVDVfEDHX-oHmkQtKgLegQIHBAB&biw=1280&bih=585&dpr=1.5#sv=CAMSURoyKhBlLWRFbU40S212SXZkejhNMg5kRW1ONEttdkl2ZHo4TToOU3FvYUt5c2lLdGRRZE0gBCoXCgFzEhBlLWRFbU40S212SXZkejhNGAEwARgHIImNwb8NSggQARgBIAEoAQ" },
  { icon: PinterestIcon, href: "https://pin.it/5CpexM7YS" },
  { icon: MusicNoteIcon, href: "https://open.spotify.com/user/31b4u3sk5zqqf6ddlctdebjqfuf4?si=a49410b199474fa8" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ bgcolor: TEXT_DARK, color: BEIGE_LIGHT, mt: 0 }}>
      {/* ===== ƏSAS FOOTER ===== */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr) 1.5fr 1.5fr",
            },
            gap: { xs: 4, md: 3 },
            alignItems: "flex-start",
          }}
        >
          {/* 1. MAĞAZA */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Mağaza
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {shopLinks.map((item) => (
                <Typography
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={scrollToTop}
                  sx={{
                    fontSize: "0.85rem",
                    color: `${BEIGE_LIGHT}99`,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* 2. KƏŞF ET */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Kəşf Et
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {discoverLinks.map((item) => (
                <Typography
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={scrollToTop}
                  sx={{
                    fontSize: "0.85rem",
                    color: `${BEIGE_LIGHT}99`,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* 3. KÖMƏK */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: BEIGE,
                mb: 2.5,
              }}
            >
              Kömək
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {helpLinks.map((item) =>
                item.isExternal ? (
                  <Typography
                    key={item.label}
                    component="a"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: "0.85rem",
                      color: `${BEIGE_LIGHT}99`,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      "&:hover": { color: BEIGE_LIGHT },
                    }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Typography
                    key={item.label}
                    component={Link}
                    to={item.path}
                    onClick={scrollToTop}
                    sx={{
                      fontSize: "0.85rem",
                      color: `${BEIGE_LIGHT}99`,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      "&:hover": { color: BEIGE_LIGHT },
                    }}
                  >
                    {item.label}
                  </Typography>
                )
              )}
            </Box>
          </Box>

          {/* 4. LOGO VƏ SLOGAN */}
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
                mx: { xs: 0, md: "auto" },
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
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: `${BEIGE_LIGHT}80`,
                    p: 0.6,
                    "&:hover": { color: BEIGE_LIGHT },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* 5. SITAT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              gridColumn: { xs: "span 2", sm: "span 1" },
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
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography sx={{ fontSize: "0.75rem", color: `${BEIGE_LIGHT}60` }}>
            © {new Date().getFullYear()} Lumière. Bütün hüquqlar qorunur.
          </Typography>

          {/* Dil Seçimi */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {["AZ", "EN", "RU"].map((lang, i) => (
              <Typography
                key={lang}
                sx={{
                  fontSize: "0.75rem",
                  color: i === 0 ? BEIGE_LIGHT : `${BEIGE_LIGHT}60`,
                  cursor: "pointer",
                  fontWeight: i === 0 ? 600 : 400,
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