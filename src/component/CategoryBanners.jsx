import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TEXT_DARK = "#3a2e2a";
const TEXT_LIGHT = "#6b5b52";

const categories = [
  {
    id: 1,
    title: "Üz Baxımı",
    subtitle: "Parlaq və sağlam dəri üçün",
    path: "/face",
    image: "https://i.ibb.co/Xr5Nk1dS/uzbaximi-k1.webp",
  },
  {
    id: 2,
    title: "Saç Baxımı",
    subtitle: "Təbii güc və parlaqlıq üçün",
    path: "/hair",
    image: "https://i.ibb.co/9m50nWtR/sacbaximi-k2.webp",
  },
  {
    id: 3,
    title: "Bədən Baxımı",
    subtitle: "Nəmləndir, qidalandır, yenilə",
    path: "/body",
    image: "https://i.ibb.co/sJXVd7Zr/bedenbaximi-k3.webp",
  },
  {
    id: 4,
    title: "Ətirlər",
    subtitle: "Xatirələr yaradan ətirlər",
    path: "/fragrance",
    image: "https://i.ibb.co/dsDmyL0R/etirler-k4.webp",
  },
  {
    id: 5,
    title: "Makyaj",
    subtitle: "Gözəlliyini vurğula",
    path: "/makeup",
    image: "https://i.ibb.co/5hbFqSy4/makyaj-k5.webp",
  },
];

function CategoryBanners() {
  return (
    <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: "#fdfbf9" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        {/* Başlıq */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textAlign: "center",
            color: TEXT_DARK,
            fontWeight: 400,
            fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2.2rem" },
            letterSpacing: 1,
            mb: { xs: 3.5, md: 5 },
            position: "relative",
            display: "inline-block",
            width: "100%",
            "&::after": {
              content: '"—"',
              ml: 1.5,
              fontWeight: 300,
              opacity: 0.5,
            },
          }}
        >
          Öz ritualını kəşf et
        </Typography>

        {/* 5 Sütunlu Kart Şəbəkəsi */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: { xs: 1.5, md: 2.2 },
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.id}
              component={NavLink}
              to={cat.path}
              sx={{
                textDecoration: "none",
                position: "relative",
                // Bir qədər böyüdülmüş balanslı hündürlük:
                height: { xs: 290, sm: 330, md: 365 },
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(58,46,42,0.06)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 28px rgba(58,46,42,0.12)",
                },
                "&:hover .banner-img": {
                  transform: "scale(1.06)",
                },
                "&:hover .discover-link": {
                  color: "#8c6d58",
                  borderColor: "#8c6d58",
                },
              }}
            >
              {/* Arxa Plan Şəkli */}
              <Box
                className="banner-img"
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.5s ease",
                }}
              />

              {/* Təbii Yüngül Gradient (Mətnlər və Kəşf Et linki aydın oxunsun deyə) */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(253,251,249,0.85) 0%, rgba(253,251,249,0.45) 45%, rgba(253,251,249,0) 75%)",
                }}
              />

              {/* Məzmun Bloku: Başlıq -> Subtitle -> Kəşf Et */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: { xs: 2, md: 2.5 },
                  pt: { xs: 2.5, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: TEXT_DARK,
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {cat.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", md: "0.8rem" },
                    color: TEXT_LIGHT,
                    lineHeight: 1.35,
                    maxWidth: 170,
                    mb: 1.8, // Subtitle ilə Kəşf Et arasındakı məsafə
                  }}
                >
                  {cat.subtitle}
                </Typography>

                {/* Subtitle-ın Dərhal Altındakı "Kəşf Et" */}
                <Typography
                  component="span"
                  className="discover-link"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.6,
                    color: TEXT_DARK,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    borderBottom: `1.2px solid ${TEXT_DARK}`,
                    pb: "2px",
                    transition: "all 0.25s ease",
                  }}
                >
                  Kəşf Et
                  <ArrowForwardIcon sx={{ fontSize: "13px !important" }} />
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default CategoryBanners;