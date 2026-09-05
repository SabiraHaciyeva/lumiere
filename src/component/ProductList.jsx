import { useRef } from "react";
import { NavLink } from "react-router";
import { Box, Typography, IconButton, Button, Container } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProductCard from "./ProductCard";

const TEXT_DARK = "#3a2e2a";
const TEXT_LIGHT = "#6b5b52";

function ProductList({
  products = [],
  title = "Ən sevilənlər",
  showAllText = "HAMISINI GÖR",
  viewAllPath = "/collections",
}) {
  const scrollContainerRef = useRef(null);//useRef: JavaScript-dəki document.getElementById("qutu") əmrinin React-dəki təhlükəsiz qarşılığıdır.

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ width: "100%", py: { xs: 4, md: 6 }, bgcolor: "#fff" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        {/* Başlıq */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              color: TEXT_DARK,
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
            }}
          >
            {title}
          </Typography>
            
          <Button
            component={NavLink}
            to={viewAllPath}
            endIcon={<ArrowForwardIcon sx={{ fontSize: "14px !important" }} />}
            sx={{
              color: TEXT_LIGHT,
              fontSize: "0.75rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 600,
              minWidth: "auto",
              p: 0,
              "&:hover": {
                color: TEXT_DARK,
                bgcolor: "transparent",
              },
            }}
          >
            {showAllText}
          </Button>
        </Box>

        {/* Karusel */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -16,
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 3,
              bgcolor: "#fff",
              boxShadow: "0 4px 14px rgba(58,46,42,0.12)",
              width: 38,
              height: 38,
              color: TEXT_DARK,
              display: { xs: "none", md: "flex" },
              "&:hover": { bgcolor: "#fff", boxShadow: "0 6px 18px rgba(58,46,42,0.18)" },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>

          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              gap: { xs: 2, md: 2.5 },
              overflowX: "auto",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              pb: 1.5,
              pt: 0.5,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                  width: { xs: 240, sm: 260, md: 270 },
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -16,
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 3,
              bgcolor: "#fff",
              boxShadow: "0 4px 14px rgba(58,46,42,0.12)",
              width: 38,
              height: 38,
              color: TEXT_DARK,
              display: { xs: "none", md: "flex" },
              "&:hover": { bgcolor: "#fff", boxShadow: "0 6px 18px rgba(58,46,42,0.18)" },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductList;