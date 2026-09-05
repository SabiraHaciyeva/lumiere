import { useState, useMemo, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  InputBase,
  Slide,
  Backdrop,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useProducts } from "../context/ProductContext";
import { useShop } from "../provider/ShopProvider";

import { useAuth } from "../provider/AuthProvider";
import AuthModal from "./AuthModal";

const BEIGE = "#DAC0B1";
const BEIGE_DARK = "#c4a996";
const BEIGE_LIGHT = "#f3e8e0";
const TEXT_DARK = "#2c221e";
const TEXT_LIGHT = "#7a6b63";

//ingilis klavyaturasi
const normalizeStr = (str = "") => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/İ/g, "i")
    .replace(/I/g, "i");
};

// MENYU STRUKTURU
//leftpages ve rightpages menunun sol ve sag hissesini teskil edir
const leftPages = [
  {
    label: "KOLLEKSİYALAR",
    path: "/collections",
    subItems: [
      { label: "Ən Çox Satılanlar", path: "/collections/best-sellers" },
      { label: "Yay Kolleksiyası", path: "/collections/summer" },
      { label: "Hədiyyə Dəstləri", path: "/collections/gift-sets" },
      { label: "Limitli Sayda", path: "/collections/limited" },
    ],
  },
  {
    label: "ÜZ BAXIMI",
    path: "/face",
    subItems: [
      { label: "Təmizləyici Gellər & Köpüklər", path: "/face/cleansers" },
      { label: "Toniklər & Mislər", path: "/face/toners" },
      { label: "Zərdablar & Serumlar", path: "/face/serums" },
      { label: "Nəmləndirici & Qidalandırıcı Kremlər", path: "/face/moisturisers" },
      { label: "Göz Ətrafı Qulluq", path: "/face/eye-care" },
      { label: "Dodaq Balzamları & Maskaları", path: "/face/lip-care" },
    ],
  },
  {
    label: "BƏDƏN BAXIMI",
    path: "/body",
    subItems: [
      { label: "Bədən Losyonları & Yağları", path: "/body/lotions" },
      { label: "Bədən Skrabları", path: "/body/scrubs" },
      { label: "Duş Gelləri & Vanna Köpükləri", path: "/body/bath-shower" },
      { label: "Əl & Dırnaq Kremləri", path: "/body/hand-care" },
      { label: "Ayaq Baxımı", path: "/body/foot-care" },
    ],
  },
  {
    label: "SAÇ BAXIMI",
    path: "/hair",
    subItems: [
      { label: "Şampunlar & Balzamlar", path: "/hair/shampoos" },
      { label: "Bərpaedici Maskalar & Yağlar", path: "/hair/masks" },
      { label: "Baş Dərisi Baxımı", path: "/hair/scalp" },
      { label: "Staylinq Spreyləri & Qoruyucular", path: "/hair/styling" },
    ],
  },
];

const rightPages = [
  {
    label: "ƏTİRLƏR",
    path: "/fragrance",
    subItems: [
      { label: "Parfümlər (Eau de Parfum)", path: "/fragrance/edp" },
      { label: "Bədən Spreyləri (Body Mists)", path: "/fragrance/mists" },
      { label: "Aromatik Şamlar & Ev Qoxuları", path: "/fragrance/candles" },
    ],
  },
  {
    label: "MAKYAJ",
    path: "/makeup",
    subItems: [
      { label: "Tonal Kremlər & Korrektorlar", path: "/makeup/face-makeup" },
      { label: "Pudralar & Ənliklər", path: "/makeup/powders" },
      { label: "Göz Kölgələri & Laynerlər", path: "/makeup/eyes" },
      { label: "Dodaq Boyaları & Parıldadıcılar", path: "/makeup/lips" },
      { label: "Makyaj Fırçaları & Süngərlər", path: "/makeup/tools" },
    ],
  },
  {
    label: "YENİ GƏLƏNLƏR",
    path: "/new",
    subItems: [
      { label: "Yeni Məhsullar", path: "/new/products" },
      { label: "Baxım və Hədiyyə Dəstləri", path: "/new/sets" },
    ],
  },
  {
    label: "ENDİRİMLƏR",
    path: "/sale",
    subItems: [
      { label: "Bütün Endirimli Məhsullar", path: "/sale" },
      { label: "20%-dək Endirimlər", path: "/sale/under-20" },
      { label: "30% və Daha Çox", path: "/sale/over-30" },
    ],
  },
];

function Header() {
  const {
    favorites,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    increaseFavoriteQuantity,
    decreaseFavoriteQuantity,
    removeFromFavorites,
  } = useShop();

  const { currentUser } = useAuth(); // Aktiv istifadəçini götürürük
  const [authModalOpen, setAuthModalOpen] = useState(false); // Modal state-i

  const { products } = useProducts();

  const handleProfileClick = () => {
    if (currentUser) {
      navigate("/profile"); // Daxil olubsa profil səhifəsinə get
    } else {
      setAuthModalOpen(true); // Daxil olmayıbsa login modalını aç
    }
    setMobileDrawerOpen(false);
  };

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);//burger
  const [mobileOpenMenu, setMobileOpenMenu] = useState("");//akordiom
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  //search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openCart = () => {
    setFavoritesOpen(false);
    setCartOpen(true);
    setIsSearchOpen(false);
  };

  const openFavorites = () => {
    setCartOpen(false);
    setFavoritesOpen(true);
    setIsSearchOpen(false);
  };

  const toggleMobileSubmenu = (label) => {
    setMobileOpenMenu(mobileOpenMenu === label ? "" : label);
  };
  //cem pb
  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * Number(product.quantity || 1),
    0
  ).toFixed(2);
  //sebetbadge
  const totalCartCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );


  const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(0);
const [couponError, setCouponError] = useState("");

const applyCoupon = () => {
  const clean = coupon.trim().toUpperCase();
  if (clean === "LUMIERE10") {
    setDiscount(10);
    setCouponError("");
    setCoupon("");
  } else {
    setCouponError("Kupon kodu tapılmadı!");
  }
};

// 1. İlkin köhnə qiymətlərin cəmi (əgər endirim yoxdursa cari qiyməti götürür)
const originalTotal = cart.reduce(
  (sum, item) => sum + Number(item.oldPrice || item.price) * Number(item.quantity || 1),
  0
);

// 2. Məhsulların cari satış cəmi
const currentTotal = cart.reduce(
  (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
  0
);

// Məhsul endirimi varmı?
const hasProductDiscounts = originalTotal > currentTotal;

// 3. Kupon endirimi və Yekun ödəniş
const couponAmount = (currentTotal * discount) / 100;
const finalTotal = (currentTotal - couponAmount).toFixed(2);
  //serach usememo
  const liveSearchResults = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return [];

    const cleanQuery = normalizeStr(query);

    return products
      .filter((item) => {
        const cleanName = normalizeStr(item.name);
        return cleanName.startsWith(cleanQuery);
      })
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setMobileDrawerOpen(false);
      setSearchQuery("");
    }
  };

  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setMobileDrawerOpen(false);
    setSearchQuery("");
  };
  //dekstop dropdowmu
  const renderNavDropdown = (pages, isLeftGroup = true) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { lg: 1.5, xl: 2.5 },
        justifyContent: isLeftGroup ? "flex-end" : "flex-start",
      }}
    >
      {pages.map((page) => (
        <Box
          key={page.path}
          onMouseEnter={() => setActiveDropdown(page.label)}
          onMouseLeave={() => setActiveDropdown(null)}
          sx={{ position: "relative" }}
        >
          <Button
            component={NavLink}
            to={page.path}
            sx={{
              color: TEXT_DARK,
              textTransform: "uppercase",
              fontSize: { lg: "0.73rem", xl: "0.8rem" },
              fontWeight: 500,
              letterSpacing: "1px",
              px: { lg: 0.8, xl: 1.2 },
              py: 2.5,
              whiteSpace: "nowrap",
              minWidth: "auto",
              position: "relative",
              borderRadius: 0,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 12,
                left: "50%",
                width: 0,
                height: "2px",
                bgcolor: BEIGE_DARK,
                transition: "all 0.3s ease",
                transform: "translateX(-50%)",
              },
              "&:hover::after, &.active::after": {
                width: "70%",
              },
              "&.active": {
                color: BEIGE_DARK,
                fontWeight: 600,
              },
              "&:hover": {
                bgcolor: "transparent",
                color: BEIGE_DARK,
              },
            }}
          >
            {page.label}
          </Button>

          {page.subItems && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: "50%",
                width: 230,
                bgcolor: "white",
                boxShadow: "0 10px 30px rgba(58,46,42,0.08)",
                borderRadius: "0 0 8px 8px",
                border: `1px solid ${BEIGE_LIGHT}`,
                borderTop: `2px solid ${BEIGE_DARK}`,
                py: 1,
                opacity: activeDropdown === page.label ? 1 : 0,
                visibility: activeDropdown === page.label ? "visible" : "hidden",
                transform:
                  activeDropdown === page.label
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(8px)",
                transition: "all 0.25s ease",
                zIndex: 1200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {page.subItems.map((sub) => (
                <Box
                  key={sub.path}
                  component={NavLink}
                  to={sub.path}
                  sx={{
                    py: 1.2,
                    px: 2.2,
                    fontSize: "0.78rem",
                    letterSpacing: "0.3px",
                    color: TEXT_DARK,
                    textDecoration: "none",
                    display: "block",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: BEIGE_LIGHT,
                      color: BEIGE_DARK,
                      pl: 2.8,
                    },
                  }}
                >
                  {sub.label}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1200,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* 1. Real Hero*/}
      <Box
        sx={{
          bgcolor: BEIGE,
          color: TEXT_DARK,
          py: 0.8,
          textAlign: "center",
          fontSize: "0.8rem",
          letterSpacing: "0.3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <StarIcon sx={{ fontSize: 14 }} />
        <span>50 AZN və üzəri sifarişlərdə pulsuz çatdırılma</span>
      </Box>

      {/* 2. HEADER NAVBAR */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: TEXT_DARK,
          borderBottom: `1px solid ${BEIGE_LIGHT}`,
          width: "100%",
          position: "relative",
          zIndex: 1202,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            boxSizing: "border-box",
          }}
        >
          {/* DESKTOP HEADER */}
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 58, sm: 62, md: 74 },
              display: { xs: "none", lg: "grid" },
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: { lg: 2, xl: 3 },
            }}
          >
            {/* left psge*/}
            {renderNavDropdown(leftPages, true)}

            {/* merkez logo */}
            <Box sx={{ textAlign: "center", px: { lg: 2, xl: 4 } }}>
              <NavLink
                to="/"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    color: TEXT_DARK,
                    fontSize: { lg: "1.35rem", xl: "1.5rem" },
                    letterSpacing: { lg: 3, xl: 4 },
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  LUMIÈRE
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.58rem",
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: TEXT_LIGHT,
                    mt: 0.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  Botanical Beauty
                </Typography>
              </NavLink>
            </Box>

            {/* right page+ikonalar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {renderNavDropdown(rightPages, false)}

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
                {/* Search ikonasi */}
                <IconButton
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  sx={{
                    color: isSearchOpen ? BEIGE_DARK : TEXT_DARK,
                    p: 1,
                    transition: "color 0.2s ease",
                  }}
                >
                  {isSearchOpen ? <CloseIcon sx={{ fontSize: 21 }} /> : <SearchIcon sx={{ fontSize: 21 }} />}
                </IconButton>
                  {/* Profil ikonasi */}
                <IconButton onClick={handleProfileClick} sx={{ color: TEXT_DARK, p: 1 }} title={currentUser ? "Profilim" : "Giriş"}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 21 }} />
                </IconButton>
                  {/* Favorit ikonasi */}
                <IconButton onClick={openFavorites} sx={{ color: TEXT_DARK, p: 1 }}>
                  <Badge
                    badgeContent={favorites.length}
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: TEXT_DARK,
                        color: "white",
                        fontSize: "0.65rem",
                        minWidth: 16,
                        height: 16,
                      },
                    }}
                  >
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 21 }} />
                  </Badge>
                </IconButton>
                    {/* Sebet ikonasi */}
                <IconButton onClick={openCart} sx={{ color: TEXT_DARK, p: 1 }}>
                  <Badge
                    badgeContent={totalCartCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: TEXT_DARK,
                        color: "white",
                        fontSize: "0.65rem",
                        minWidth: 16,
                        height: 16,
                      },
                    }}
                  >
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 21 }} />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
          </Toolbar>

          {/* MOBİL VƏ PLANŞET HEADER */}
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 58, sm: 62 },
              display: { xs: "flex", lg: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ color: TEXT_DARK, p: 0.5 }}
            >
              <MenuIcon />
            </IconButton>

            <NavLink to="/" style={{ textDecoration: "none", textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  color: TEXT_DARK,
                  fontSize: { xs: "1.15rem", sm: "1.3rem" },
                  letterSpacing: 2,
                  lineHeight: 1,
                }}
              >
                LUMIÈRE
              </Typography>
            </NavLink>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton onClick={() => setIsSearchOpen((prev) => !prev)} sx={{ color: TEXT_DARK, p: 0.7 }}>
                {isSearchOpen ? <CloseIcon sx={{ fontSize: 21 }} /> : <SearchIcon sx={{ fontSize: 21 }} />}
              </IconButton>

              <IconButton onClick={openFavorites} sx={{ color: TEXT_DARK, p: 0.7 }}>
                <Badge
                  badgeContent={favorites.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: TEXT_DARK,
                      color: "white",
                      fontSize: "0.65rem",
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>

              <IconButton onClick={openCart} sx={{ color: TEXT_DARK, p: 0.7 }}>
                <Badge
                  badgeContent={totalCartCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: TEXT_DARK,
                      color: "white",
                      fontSize: "0.65rem",
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 3. dropsearch*/}
      <Slide
        direction="down"
        in={isSearchOpen}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 260, exit: 200 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            width: "100%",
            bgcolor: "#ffffff",
            borderBottom: `1px solid ${BEIGE_LIGHT}`,
            boxShadow: "0 10px 25px rgba(44,34,30,0.06)",
            zIndex: 1201,
            py: 1.5,
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            {/* Axtarış Sətri */}
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: `1px solid ${BEIGE_DARK}`,
                pb: 0.8,
              }}
            >
              <SearchIcon sx={{ color: TEXT_DARK, fontSize: 20, mr: 1 }} />
              <InputBase
                inputRef={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Məhsul adı daxil edin (məs: Nəmləndirici, Tonal, Gel...)"
                fullWidth
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  color: TEXT_DARK,
                  "& input": { p: 0 },
                }}
              />
              {searchQuery && (
                <IconButton onClick={() => setSearchQuery("")} size="small" sx={{ color: TEXT_LIGHT, p: 0.3, mr: 0.5 }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
              <Button
                type="submit"
                sx={{
                  bgcolor: TEXT_DARK,
                  color: "#ffffff",
                  px: 1.8,
                  py: 0.4,
                  fontSize: "0.72rem",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  borderRadius: "3px",
                  minWidth: "auto",
                  "&:hover": { bgcolor: "#423530" },
                }}
              >
                Axtar
              </Button>
            </Box>

            {/* Alt-alta Düzülən Nəticələr & Zərif Scrollbar */}
            {searchQuery.trim() && (
              <Box sx={{ mt: 1.5 }}>
                {liveSearchResults.length === 0 ? (
                  <Box sx={{ py: 2, textAlign: "left" }}>
                    <Typography sx={{ color: TEXT_LIGHT, fontSize: "0.82rem" }}>
                      "<strong>{searchQuery}</strong>" adına uyğun heç bir məhsul tapılmadı.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#998b82",
                        mb: 0.8,
                      }}
                    >
                      Məhsullar ({liveSearchResults.length})
                    </Typography>

                    {/* Siyahı Qutusu */}
                    <Box
                      sx={{
                        maxHeight: "260px",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        pr: 0.5,
                        // Xüsusi zərif scrollbar
                        "&::-webkit-scrollbar": { width: "4px" },
                        "&::-webkit-scrollbar-track": { bgcolor: "#faf7f4" },
                        "&::-webkit-scrollbar-thumb": { bgcolor: BEIGE_DARK, borderRadius: "4px" },
                      }}
                    >
                      {liveSearchResults.map((item) => (
                        <Box
                          key={item.id}
                          onClick={() => handleProductSelect(item.id)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 1,
                            px: 1,
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            borderBottom: "1px solid #faf5f1",
                            "&:hover": {
                              bgcolor: "#faf7f4",
                              pl: 1.5,
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: 38,
                                height: 38,
                                borderRadius: "3px",
                                objectFit: "cover",
                                bgcolor: "#f9f6f3",
                                border: `1px solid ${BEIGE_LIGHT}`,
                                flexShrink: 0,
                              }}
                            />
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  color: TEXT_DARK,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography sx={{ fontSize: "0.68rem", color: "#998b82", textTransform: "uppercase" }}>
                                {item.category} {item.volume ? `• ${item.volume}` : ""}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_DARK }}>
                              {Number(item.price).toFixed(2)} AZN
                            </Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 11, color: BEIGE_DARK }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Container>
        </Box>
      </Slide>

      {/* Arxa Fon Qaralması */}
      <Backdrop
        open={isSearchOpen}
        onClick={() => setIsSearchOpen(false)}
        sx={{ zIndex: 1199, bgcolor: "rgba(44,34,30,0.25)" }}
      />

      {/* 4. MOBİL DRAWER MENYU */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ disableRestoreFocus: true }}
      >
        <Box sx={{ width: 310, py: 2, height: "100%", bgcolor: "#faf8f6", display: "flex", flexDirection: "column" }}>
          <Box sx={{ px: 2.5, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${BEIGE_LIGHT}` }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: 2,
                color: TEXT_DARK,
              }}
            >
              LUMIÈRE
            </Typography>
            <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ color: TEXT_DARK }}>
              <Typography sx={{ fontSize: 24, lineHeight: 1 }}>×</Typography>
            </IconButton>
          </Box>

          {/* DƏYİŞƏN HİSSƏ BURADIR (onClick={handleProfileClick} əlavə olundu) */}
          <Box sx={{ px: 2.5, py: 2 }}>
            <Button
              fullWidth
              onClick={handleProfileClick}
              startIcon={<PersonOutlineOutlinedIcon />}
              sx={{
                justifyContent: "flex-start",
                color: TEXT_DARK,
                bgcolor: "white",
                border: `1px solid ${BEIGE_LIGHT}`,
                borderRadius: 2,
                py: 1,
                px: 2,
                textTransform: "none",
                fontSize: "0.85rem",
                "&:hover": { bgcolor: BEIGE_LIGHT },
              }}
            >
              {currentUser ? `Hesabım (${currentUser.fullName.split(" ")[0]})` : "Hesabım / Giriş"}
            </Button>
          </Box>

          <Divider sx={{ mx: 2.5, mb: 1, borderColor: BEIGE_LIGHT }} />

          <List sx={{ pt: 0, flex: 1, overflowY: "auto", px: 1 }}>
            {[...leftPages, ...rightPages].map((page) => (
              <Box key={page.path}>
                <ListItemButton
                  onClick={() => toggleMobileSubmenu(page.label)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1.2,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "1px", color: TEXT_DARK }}>
                        {page.label}
                      </Typography>
                    }
                  />
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18,
                      color: TEXT_LIGHT,
                      transform: mobileOpenMenu === page.label ? "rotate(180deg)" : "rotate(0)",
                      transition: "0.3s",
                    }}
                  />
                </ListItemButton>

                <Collapse in={mobileOpenMenu === page.label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ bgcolor: BEIGE_LIGHT, borderRadius: 1, mb: 0.5 }}>
                    {page.subItems?.map((sub) => (
                      <ListItemButton
                        key={sub.path}
                        component={NavLink}
                        to={sub.path}
                        onClick={() => setMobileDrawerOpen(false)}
                        sx={{ pl: 3.5, py: 0.9 }}
                      >
                        <ListItemText
                          primary={
                            <Typography sx={{ fontSize: "0.78rem", color: TEXT_DARK }}>
                              {sub.label}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 5. FAVORİLƏR DRAWER */}
      <Drawer
        anchor="right"
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        ModalProps={{ disableRestoreFocus: true }}
      >
        <Box
          sx={{
            width: { xs: "100vw", sm: 440 },
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "#faf8f6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 3,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Sevimlilərim
            </Typography>
            <IconButton onClick={() => setFavoritesOpen(false)}>
              <Typography sx={{ fontSize: 28 }}>×</Typography>
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
            {favorites.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography sx={{ color: "#777" }}>Sevimli məhsulunuz yoxdur</Typography>
              </Box>
            ) : (
              favorites.map((product) => (
                <Box
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.01)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 100,
                      flexShrink: 0,
                      backgroundColor: "#f1ebe7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: 11, color: "#999", textAlign: "center" }}>
                        Şəkil yoxdur
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 500, mb: 0.5 }}>{product.name}</Typography>
                    <Typography sx={{ color: TEXT_LIGHT, fontSize: 14, mb: 1.5 }}>
                      {product.price} AZN
                    </Typography>
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        border: "1px solid #ddd",
                        mb: 1.5,
                      }}
                    >
                      <Button
                        onClick={() => decreaseFavoriteQuantity(product.id)}
                        sx={{ minWidth: 32, color: TEXT_DARK }}
                      >
                        −
                      </Button>
                      <Typography sx={{ minWidth: 25, textAlign: "center", fontSize: 14 }}>
                        {product.quantity || 1}
                      </Typography>
                      <Button
                        onClick={() => increaseFavoriteQuantity(product.id)}
                        sx={{ minWidth: 32, color: TEXT_DARK }}
                      >
                        +
                      </Button>
                    </Box>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.quantity || 1);
                      }}
                      size="small"
                      sx={{
                        backgroundColor: TEXT_DARK,
                        color: "white",
                        textTransform: "none",
                        px: 2,
                        "&:hover": { backgroundColor: "#55443d" },
                      }}
                    >
                      Səbətə əlavə et
                    </Button>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(product.id);
                    }}
                    sx={{ alignSelf: "flex-start", color: TEXT_DARK, "&:hover": { color: "#999" } }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Drawer>

      {/* 6. SƏBƏT DRAWER */}
      {/* SƏBƏT DRAWER */}
<Drawer
  anchor="right"
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  ModalProps={{ disableRestoreFocus: true }}
>
  <Box
    sx={{
      width: { xs: "100vw", sm: 420 },
      height: "100%",
      bgcolor: "#faf8f6",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* BAŞLIQ */}
    <Box sx={{ p: 2.5, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.15rem" }}>
        Səbətim ({totalCartCount})
      </Typography>
      <IconButton onClick={() => setCartOpen(false)} sx={{ color: TEXT_DARK, p: 0.5 }}>
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>

    <Divider sx={{ borderColor: "#ece5de" }} />

    {/* MƏHSUL SİYAHISI */}
    <Box sx={{ flex: 1, overflowY: "auto", px: 3 }}>
      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography sx={{ color: "#888", fontSize: "0.9rem" }}>Səbətiniz boşdur</Typography>
        </Box>
      ) : (
        cart.map((product) => {
          const hasDiscount = Boolean(
            (product.oldPrice && Number(product.oldPrice) > Number(product.price)) || product.discount
          );
          const isNew = Boolean(product.isNew);

          return (
            <Box
              key={product.id}
              onClick={() => handleProductSelect(product.id)}
              sx={{
                display: "flex",
                gap: 2,
                py: 2,
                borderBottom: "1px solid #efeae4",
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: 70,
                  height: 80,
                  objectFit: "cover",
                  bgcolor: "#f2ece6",
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, color: TEXT_DARK }} noWrap>
                    {product.name}
                  </Typography>

                  {isNew && (
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "#2e7d32",
                        bgcolor: "#e8f5e9",
                        px: 0.7,
                        py: 0.1,
                        borderRadius: "2px",
                      }}
                    >
                      YENİ
                    </Typography>
                  )}

                  {hasDiscount && (
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "#d32f2f",
                        bgcolor: "#ffebee",
                        px: 0.7,
                        py: 0.1,
                        borderRadius: "2px",
                      }}
                    >
                      ENDİRİM
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: hasDiscount ? "#d32f2f" : TEXT_DARK }}>
                    {Number(product.price).toFixed(2)} AZN
                  </Typography>

                  {hasDiscount && product.oldPrice && (
                    <Typography sx={{ fontSize: "0.75rem", color: "#999", textDecoration: "line-through" }}>
                      {Number(product.oldPrice).toFixed(2)} AZN
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ded5cc",
                      borderRadius: "3px",
                      bgcolor: "#fff",
                    }}
                  >
                    <Button
                      onClick={() => decreaseQuantity(product.id)}
                      sx={{ minWidth: 24, height: 24, p: 0, color: TEXT_DARK, fontSize: 13 }}
                    >
                      −
                    </Button>
                    <Typography sx={{ minWidth: 22, textAlign: "center", fontSize: "0.78rem" }}>
                      {product.quantity}
                    </Typography>
                    <Button
                      onClick={() => increaseQuantity(product.id)}
                      sx={{ minWidth: 24, height: 24, p: 0, color: TEXT_DARK, fontSize: 13 }}
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(product.id);
                    }}
                    sx={{ minWidth: "auto", p: 0, color: "#999", fontSize: "0.72rem", textTransform: "none" }}
                  >
                    Sil
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
    </Box>

    {/* FOOTER - QƏBZ VƏ SİFARİŞ */}
    {cart.length > 0 && (
      <Box sx={{ p: 2.5, px: 3, borderTop: "1px solid #ece5de", bgcolor: "#fff" }}>
        {/* KUPON GİRİŞİ VƏ XƏTA */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <InputBase
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponError("");
              }}
              placeholder={discount > 0 ? `LUMIERE10 (-${discount}%)` : "Kupon kodu"}
              disabled={discount > 0}
              sx={{
                flex: 1,
                border: `1px solid ${couponError ? "#d32f2f" : "#e0d8d0"}`,
                px: 1.2,
                py: 0.3,
                fontSize: "0.78rem",
                borderRadius: "2px",
              }}
            />
            {discount > 0 ? (
              <Button
                onClick={() => setDiscount(0)}
                sx={{ color: "#d32f2f", fontSize: "0.72rem", textTransform: "none", minWidth: "auto", p: 0.5 }}
              >
                Sil
              </Button>
            ) : (
              <Button
                onClick={applyCoupon}
                sx={{
                  bgcolor: TEXT_DARK,
                  color: "#fff",
                  px: 1.5,
                  fontSize: "0.72rem",
                  borderRadius: "2px",
                  "&:hover": { bgcolor: "#444" },
                }}
              >
                Tətbiq et
              </Button>
            )}
          </Box>

          {couponError && (
            <Typography sx={{ color: "#d32f2f", fontSize: "0.7rem", mt: 0.4, pl: 0.5 }}>
              {couponError}
            </Typography>
          )}
        </Box>

        {/* HESAB-FAKTURA / QƏBZ */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, mb: 1.5 }}>
          {/* Məhsullar və endirimli üstü xətli cəm */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#777" }}>Məhsulların cəmi</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {hasProductDiscounts && (
                <Typography sx={{ fontSize: "0.75rem", color: "#999", textDecoration: "line-through" }}>
                  {originalTotal.toFixed(2)} AZN
                </Typography>
              )}
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK }}>
                {currentTotal.toFixed(2)} AZN
              </Typography>
            </Box>
          </Box>

          {/* Kupon endirimi sətri */}
          {discount > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.8rem", color: "#d32f2f" }}>Kupon endirimi ({discount}%)</Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "#d32f2f", fontWeight: 600 }}>
                -{couponAmount.toFixed(2)} AZN
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 0.4, borderColor: "#f0eae4" }} />

          {/* Yekun nəticə */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: TEXT_DARK }}>Yekun ödəniş</Typography>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: TEXT_DARK }}>{finalTotal} AZN</Typography>
          </Box>
        </Box>

        {/* SİFARİŞ DÜYMƏSİ */}
        <Button
          fullWidth
          sx={{
            bgcolor: TEXT_DARK,
            color: "#fff",
            py: 1.1,
            fontSize: "0.82rem",
            textTransform: "uppercase",
            letterSpacing: 1,
            borderRadius: "2px",
            "&:hover": { bgcolor: "#444" },
          }}
        >
          Sifarişi rəsmiləşdir
        </Button>
      </Box>
    )}
  </Box>
</Drawer>
      {/* GİRİŞ / QEYDİYYAT MODALI */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  );
}

export default Header;