import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TEXT_DARK = "#28201c";
const TEXT_MUTED = "#7a6b63";
const ACCENT = "#9c7a65";

// Sol tərəfdəki böyük "Ritual" kartının arxa plan şəkli:
const RITUAL_BG_IMAGE = "https://i.ibb.co/dwMyCd65/journalleft.webp";

// Sağ tərəfdəki 3 zərif sətir kart:
const journalPosts = [
  {
    id: "01",
    tag: "Ətir Fəlsəfəsi",
    title: "Ətir sadəcə qoxu deyil",
    desc: "Məkana daxil olduqda buraxdığınız ilk təəssürat və getdiyinizdə qalan unudulmaz xatirə.",
    image: "https://i.ibb.co/Gf96ySr7/journal01.webp",
    path: "/fragrance",
  },
  {
    id: "02",
    tag: "Dəri Ritualı",
    title: "Dərinin təbii işıltısı",
    desc: "Mükəmməl dəri makyaj altında gizlənən deyil, dərindən nəmlənmiş və nəfəs alan dəridir.",
    image: "https://i.ibb.co/ycJLRvZj/journal02.webp",
    path: "/face",
  },
  {
    id: "03",
    tag: "Özünə Qayğı",
    title: "Günün yorğunluğunu unut",
    desc: "Zəngin teksturalar və rahatladıcı aromalarla günün sonunda özünüzə kiçik bir hədiyyə bəxş edin.",
    image: "https://i.ibb.co/j73DWp0/journal03.webp",
    path: "/body",
  },
];

function JournalSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fbf9f6" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
            gap: { xs: 4, md: 5, lg: 6.5 },
            alignItems: "stretch",
          }}
        >
          {/* ================= SOL: BÖYÜK RİTUAL BANNERİ ================= */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 350, sm: 400, md: "auto" },
              borderRadius: "4px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: { xs: 3, sm: 4.5 },
              backgroundImage: `url(${RITUAL_BG_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 12px 35px rgba(40, 32, 28, 0.08)",
            }}
          >
            {/* Təbii Tünd Gradient */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(28,21,18,0.88) 0%, rgba(28,21,18,0.25) 55%, transparent 100%)",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                sx={{
                  color: "#dcc5b4",
                  fontSize: "0.7rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  mb: 1.2,
                }}
              >
                Gündəlik Fəlsəfə
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#ffffff",
                  fontSize: { xs: "1.75rem", sm: "2.1rem", lg: "2.35rem" },
                  lineHeight: 1.18,
                  fontWeight: 400,
                  mb: 1.5,
                }}
              >
                Özünə ayırdığın <br />
                hər an gözəldir.
              </Typography>

              <Typography
                sx={{
                  color: "#ede4dc",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  mb: 3,
                  maxWidth: 360,
                }}
              >
                Gözəllik yalnız görünüş deyil. Bu, özünüzə göstərdiyiniz zərif qayğının gündəlik ritualıdır.
              </Typography>

              <Typography
                component={NavLink}
                to="/collections"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  color: "#ffffff",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1.5px solid #ffffff",
                  pb: "2px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    color: "#dcc5b4",
                    borderColor: "#dcc5b4",
                    transform: "translateX(4px)",
                  },
                }}
              >
                Kolleksiyaları Kəşf Et
                <ArrowForwardIcon sx={{ fontSize: "13px !important" }} />
              </Typography>
            </Box>
          </Box>

          {/* ================= SAĞ: EDITORIAL SƏTİRLƏR ================= */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              py: { md: 0.5 },
            }}
          >
            {journalPosts.map((post, idx) => (
              <Box
                key={post.id}
                component={NavLink}
                to={post.path}
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, sm: 2.5 },
                  py: { xs: 2, sm: 2.2 },
                  borderBottom: idx !== journalPosts.length - 1 ? "1px solid rgba(40, 32, 28, 0.08)" : "none",
                  transition: "all 0.3s ease",
                  "&:hover .row-img": { transform: "scale(1.08)" },
                  "&:hover .row-title": { color: ACCENT },
                  "&:hover .row-num": { color: ACCENT, opacity: 1 },
                  "&:hover .row-arrow": { transform: "translateX(4px)", color: ACCENT },
                }}
              >
                {/* Sol: İncə Nömrələmə (01, 02, 03) */}
                <Typography
                  className="row-num"
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "#c2b4aa",
                    letterSpacing: "1px",
                    opacity: 0.8,
                    transition: "all 0.25s ease",
                    display: { xs: "none", sm: "block" },
                    minWidth: 24,
                  }}
                >
                  {post.id}
                </Typography>

                {/* Şəkil */}
                <Box
                  sx={{
                    width: { xs: 75, sm: 88 },
                    height: { xs: 75, sm: 88 },
                    flexShrink: 0,
                    borderRadius: "4px",
                    overflow: "hidden",
                    bgcolor: "#eae1d9",
                  }}
                >
                  <Box
                    component="img"
                    className="row-img"
                    src={post.image}
                    alt={post.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </Box>

                {/* Mətnlər */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.62rem",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: ACCENT,
                      fontWeight: 700,
                      mb: 0.3,
                    }}
                  >
                    {post.tag}
                  </Typography>

                  <Typography
                    className="row-title"
                    sx={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: TEXT_DARK,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      fontWeight: 600,
                      lineHeight: 1.25,
                      mb: 0.4,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: TEXT_MUTED,
                      fontSize: "0.75rem",
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.desc}
                  </Typography>
                </Box>

                {/* Zərif Keçid Oxu */}
                <ArrowForwardIcon
                  className="row-arrow"
                  sx={{
                    fontSize: 16,
                    color: "#c7b8ad",
                    flexShrink: 0,
                    transition: "all 0.25s ease",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default JournalSection;