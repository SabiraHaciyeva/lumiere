import { useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Container, Typography, Card } from "@mui/material";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const PRIMARY_DARK = "#2c221e";
const ACCENT_BEIGE = "#DAC0B1";
const BG_SOFT = "#faf7f4";
const TEXT_MUTED = "#6b5b52";

const values = [
  {
    icon: SpaOutlinedIcon,
    title: "100% Botanik Tərkib",
    desc: "Bütün məhsullarımız zəngin bitki ekstraktları, saf efir yağları və sertifikatlı orqanik komponentlərlə hazırlanır.",
  },
  {
    icon: PetsOutlinedIcon,
    title: "Cruelty-Free & Vegan",
    desc: "Təbiətin hər bir parçasına ehtiram göstəririk. Məhsullarımızın heç biri heyvanlar üzərində sınaqdan keçirilmir.",
  },
  {
    icon: RecyclingOutlinedIcon,
    title: "Davamlı Qablaşdırma",
    desc: "Təbiətə olan izimizi minimuma endirmək üçün təkrar emala yararlı şüşə və bioloji parçalanan materiallar seçirik.",
  },
];

const guarantees = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Sürətli və Təhlükəsiz Çatdırılma",
    desc: "Bakı daxilində 24 saat ərzində, bölgələrə isə 2-3 iş günü ərzində xüsusi qoruyucu qablaşdırma ilə çatdırılır.",
  },
  {
    icon: VerifiedOutlinedIcon,
    title: "100% Orijinallıq Zəmanəti",
    desc: "Təqdim etdiyimiz hər bir məhsul beynəlxalq keyfiyyət və dermatoloji laboratoriya testlərindən keçmişdir.",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Fərdi Gözəllik Məsləhəti",
    desc: "Dəri və saç tipinizə uyğun düzgün ritualları seçmək üçün mütəxəssislərimiz sizə yardım etməyə hazırdır.",
  },
];

function AboutPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <Box sx={{ bgcolor: BG_SOFT, color: PRIMARY_DARK, pb: 12 }}>
      {/* 1. HERO BANNER (Header-in altında qalmaması üçün xüsusi padding) */}
      <Box
        sx={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(218, 192, 177, 0.25) 0%, rgba(44, 34, 30, 0) 70%),
            linear-gradient(145deg, #cea8af 0%, #944b16a5 50%, #baa1a7 100%)
          `,
          color: "#fff",
          pt: { xs: 14, sm: 16, md: 20 }, // Header-in altına girməyən geniş boşluq
          pb: { xs: 8, md: 11 },
          textAlign: "center",
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: "0.8rem",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT_BEIGE,
              mb: 2,
              fontWeight: 600,
            }}
          >
            Hekayəmiz və Fəlsəfəmiz
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.6rem" },
              fontWeight: 400,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Təbiətdən İlham Alan Saf Gözəllik
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              color: "#d8cbc4",
              lineHeight: 1.8,
              maxWidth: 620,
              mx: "auto",
              fontStyle: "italic",
            }}
          >
            Lumière — dərinin təbii harmoniyasını və gündəlik qulluq vərdişlərinizi zərif bir ritualla canlandıran botanik gözəllik məkanıdır.
          </Typography>
        </Container>
      </Box>

      {/* 2. FƏLSƏFƏMİZ BÖLMƏSİ (Rəngli Fonlu və Təbii Mətnli Qutu) */}
      <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #f7eee7 0%, #fdfaf7 50%, #f4e9e0 100%)",
            borderRadius: { xs: "16px", md: "22px" },
            border: "1px solid #ebdcd1",
            p: { xs: 3, sm: 4.5, md: 5.5 },
            boxShadow: "0 10px 30px rgba(44, 34, 30, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
            }}
          >
            {/* Sol: Təbii və Səmimi Mətn */}
            <Box>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  color: "#8c7365",
                  fontWeight: 600,
                  mb: 1.2,
                }}
              >
                Fəlsəfəmiz
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: { xs: "1.7rem", sm: "2.1rem", md: "2.3rem" },
                  mb: 2.5,
                  lineHeight: 1.3,
                  color: PRIMARY_DARK,
                }}
              >
                Təbii və güvənli qulluq vasitələri
              </Typography>
              <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.8, mb: 2, fontSize: "0.95rem" }}>
                Lumière olaraq əsas məqsədimiz dərinin təbii ehtiyaclarına uyğun, təmiz və zərərsiz tərkibli məhsullar təqdim etməkdir. Gündəlik qulluq rutinini hər kəs üçün həm faydalı, həm də xoş bir vərdişə çevirmək istəyirik.
              </Typography>
              <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.8, fontSize: "0.95rem" }}>
                Məhsullarımızda dərinin təbii qoruyucu qatını zədələməyən, bitki ekstraktları və təbii yağlardan ibarət zərif tərkiblərə üstünlük veririk.
              </Typography>
            </Box>

            {/* Sağ: Şəkil */}
            <Box>
              <Box
                component="img"
                src="https://i.ibb.co/dwMyCd65/journalleft.webp"
                alt="Lumiere Botanical Aesthetics"
                sx={{
                  width: "100%",
                  height: { xs: 260, sm: 340, md: 380 },
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 10px 28px rgba(44,34,30,0.08)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* 3. DƏYƏRLƏRİMİZ */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: "0.78rem",
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8c7365",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Dəyərlərimiz
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: { xs: "1.8rem", md: "2.3rem" },
            }}
          >
            Niyə Lumière?
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 3.5,
          }}
        >
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Card
                key={idx}
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  bgcolor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #efe7e1",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(44,34,30,0.08)",
                    borderColor: ACCENT_BEIGE,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    bgcolor: "#f6ede6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  <Icon sx={{ fontSize: 28, color: PRIMARY_DARK }} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 1.2 }}>
                  {val.title}
                </Typography>
                <Typography sx={{ color: TEXT_MUTED, fontSize: "0.88rem", lineHeight: 1.65 }}>
                  {val.desc}
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Container>

      {/* 4. ÇATDIRILMA VƏ XİDMƏTLƏR (ID="delivery") */}
      <Box id="delivery" sx={{ mt: { xs: 8, md: 12 }, pt: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "16px",
              p: { xs: 3.5, sm: 5, md: 6 },
              border: "1px solid #efe7e1",
              boxShadow: "0 8px 24px rgba(44,34,30,0.04)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#8c7365",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Müştəri Xidmətləri
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: { xs: "1.7rem", md: "2.2rem" },
                }}
              >
                Çatdırılma və Xidmət Standartlarımız
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 4,
              }}
            >
              {guarantees.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Box key={idx} sx={{ display: "flex", gap: 2.2, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "10px",
                        bgcolor: "#f6ede6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 26, color: PRIMARY_DARK }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: "1rem", mb: 0.8 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: TEXT_MUTED, fontSize: "0.87rem", lineHeight: 1.65 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;