import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Divider,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

// 1. Context və Provider importları
import { useProducts } from "../context/ProductContext";
import { useShop } from "../provider/ShopProvider";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const shop = useShop();

    // 2. Məhsulları və yüklənmə statusunu context-dən alırıq
    const { products, loading } = useProducts();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("about");

    // Səhifəyə daxil olanda və ya ID dəyişəndə səhifəni yuxarı çəkirik
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setQuantity(1);
        setActiveTab("about");
    }, [id]);

    // 3. API-dən məlumat hələ gəlməyibsə (Yüklənmə vəziyyəti)
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "75vh",
                    bgcolor: "#faf7f4",
                }}
            >
                <CircularProgress sx={{ color: "#8c7365" }} />
            </Box>
        );
    }

    // 4. Məhsulu ID-yə görə tapırıq (products massivi boş olarsa xəta verməməsi üçün || [] qoyulub)
    const product = (products || []).find((item) => String(item.id) === String(id));

    // 5. Məhsul bazada tapılmadıqda göstərilən ekran (Yalnız loading bitdikdən sonra işə düşür)
    if (!product) {
        return (
            <Box sx={{ pt: "140px", pb: 10, textAlign: "center", minHeight: "75vh", bgcolor: "#faf7f4" }}>
                <Typography variant="h5" sx={{ color: "#2c221e", mb: 2, fontWeight: 600 }}>
                    Məhsul tapılmadı
                </Typography>
                <Button
                    onClick={() => navigate(-1)}
                    sx={{
                        bgcolor: "#241e1b",
                        color: "#fff",
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#3d322d" },
                    }}
                >
                    Geri qayıt
                </Button>
            </Box>
        );
    }

    // Sevimlilər (Wishlist) məntiqi
    const favorites = shop?.favorites || [];
    const isFavorite = favorites.some((fav) => String(fav.id) === String(product.id));

    const handleToggleFavorite = () => {
        if (shop?.toggleFavorite) {
            shop.toggleFavorite(product);
        } else if (isFavorite && shop?.removeFromFavorites) {
            shop.removeFromFavorites(product.id);
        } else if (!isFavorite && shop?.addToFavorites) {
            shop.addToFavorites(product);
        }
    };

    // Endirim faizinin hesablanması
    const discountPercent =
        product.oldPrice && product.price
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : null;

    return (
        <Box
            sx={{
                bgcolor: "#faf7f4",
                minHeight: "100vh",
                pt: { xs: "105px", lg: "125px" },
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                {/* GERİ DÜYMƏSİ VƏ KATEQORİYA MƏLUMATLARI */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
                    <Button
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon sx={{ fontSize: "16px !important" }} />}
                        sx={{
                            color: "#544640",
                            textTransform: "none",
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            p: 0,
                            "&:hover": { color: "#241e1b", bgcolor: "transparent" },
                        }}
                    >
                        Geri qayıt
                    </Button>

                    <Typography sx={{ fontSize: "0.78rem", letterSpacing: "1px", textTransform: "uppercase", color: "#998b82", fontWeight: 600 }}>
                        {product.category} {product.subCategory ? `• ${product.subCategory}` : ""}
                    </Typography>
                </Box>

                {/* ƏSAS KART */}
                <Box
                    sx={{
                        bgcolor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #efe7e1",
                        p: { xs: 2.5, sm: 4, md: 5 },
                        boxShadow: "0 4px 20px rgba(44,34,30,0.03)",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "420px 1fr", lg: "460px 1fr" },
                            gap: { xs: 3.5, lg: 5.5 },
                            alignItems: "start",
                        }}
                    >
                        {/* SOL: ŞƏKİL VƏ HƏCM */}
                        <Box sx={{ position: "relative", width: "100%", maxWidth: "460px", mx: "auto" }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: { xs: "320px", sm: "380px", md: "420px" },
                                    bgcolor: "#f9f6f3",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    border: "1px solid #f0e8e2",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={product.name}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* BADGELƏR */}
                                <Box sx={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 0.6, zIndex: 2 }}>
                                    {product.isNew && (
                                        <Box sx={{ bgcolor: "#205c22", color: "#fff", fontSize: "0.68rem", fontWeight: 700, px: 1, py: 0.35, borderRadius: "3px" }}>
                                            YENİ
                                        </Box>
                                    )}
                                    {discountPercent && (
                                        <Box sx={{ bgcolor: "#910e04", color: "#fff", fontSize: "0.68rem", fontWeight: 700, px: 1, py: 0.35, borderRadius: "3px" }}>
                                            -{discountPercent}% ENDİRİM
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            {/* TƏBİİ SERTİFİKAT VƏ HƏCM QEYDİ */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1.5, px: 0.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#7a6b63" }}>
                                    <SpaOutlinedIcon sx={{ fontSize: 16 }} />
                                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                                        100% Vegan & Təbii
                                    </Typography>
                                </Box>
                                {product.volume && (
                                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#2c221e", bgcolor: "#f5eee9", px: 1, py: 0.3, borderRadius: "4px" }}>
                                        Həcm: {product.volume}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {/* SAĞ: DETALLAR */}
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {/* AD */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontSize: { xs: "1.45rem", sm: "1.75rem", lg: "2rem" },
                                    fontWeight: 600,
                                    color: "#2c221e",
                                    lineHeight: 1.25,
                                    mb: 1,
                                }}
                            >
                                {product.name}
                            </Typography>

                            {/* DƏRİ TİPİ VƏ KOD */}
                            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2 }}>
                                {product.skinType && (
                                    <Typography sx={{ fontSize: "0.8rem", color: "#7a675e", bgcolor: "#faf7f4", px: 1.2, py: 0.4, borderRadius: "4px", border: "1px solid #efe7e1" }}>
                                        Uyğundur: <strong>{product.skinType}</strong>
                                    </Typography>
                                )}
                                <Typography sx={{ fontSize: "0.78rem", color: "#8a7b73" }}>
                                    Kod: <strong>LM-{product.id}092</strong>
                                </Typography>
                            </Box>

                            {/* QİYMƏT */}
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.2, mb: 2.5 }}>
                                <Typography sx={{ fontSize: "1.65rem", fontWeight: 700, color: "#2c221e" }}>
                                    {Number(product.price).toFixed(2)} AZN
                                </Typography>
                                {product.oldPrice && (
                                    <Typography sx={{ fontSize: "1.05rem", textDecoration: "line-through", color: "#a89c94" }}>
                                        {Number(product.oldPrice).toFixed(2)} AZN
                                    </Typography>
                                )}
                            </Box>

                            {/* BENEFİTS SİYAHISI */}
                            {product.benefits && product.benefits.length > 0 && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.9, mb: 3 }}>
                                    {product.benefits.map((benefit, index) => (
                                        <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#205c22", mt: 0.3, flexShrink: 0 }} />
                                            <Typography sx={{ fontSize: "0.82rem", color: "#4a3b34", lineHeight: 1.45 }}>
                                                {benefit}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            <Divider sx={{ mb: 3, borderColor: "#efe7e1" }} />

                            {/* SAY, SƏBƏT VƏ FAVORİT */}
                            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 3.5 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #d9ccc3",
                                        borderRadius: "4px",
                                        height: 42,
                                        px: 1,
                                        bgcolor: "#faf7f4",
                                    }}
                                >
                                    <button
                                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#2c221e", padding: "0 6px" }}
                                    >
                                        −
                                    </button>
                                    <Typography sx={{ minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: "0.88rem", color: "#2c221e" }}>
                                        {quantity}
                                    </Typography>
                                    <button
                                        onClick={() => setQuantity((prev) => prev + 1)}
                                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#2c221e", padding: "0 6px" }}
                                    >
                                        +
                                    </button>
                                </Box>

                                <Button
                                    fullWidth
                                    onClick={() => shop?.addToCart && shop.addToCart(product, quantity)}
                                    sx={{
                                        height: 42,
                                        bgcolor: "#241e1b",
                                        color: "#ffffff",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.6px",
                                        textTransform: "uppercase",
                                        borderRadius: "4px",
                                        "&:hover": { bgcolor: "#3d322d" },
                                    }}
                                >
                                    SƏBƏTƏ ƏLAVƏ ET • {(product.price * quantity).toFixed(2)} AZN
                                </Button>

                                <IconButton
                                    onClick={handleToggleFavorite}
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        border: "1px solid #d9ccc3",
                                        borderRadius: "4px",
                                        bgcolor: "#fff",
                                        "&:hover": { bgcolor: "#faf7f4" },
                                    }}
                                >
                                    {isFavorite ? (
                                        <FavoriteIcon sx={{ color: "#9c0a06", fontSize: 20 }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: "#4a3b34", fontSize: 20 }} />
                                    )}
                                </IconButton>
                            </Box>

                            {/* ZƏMANƏT MƏLUMATLARI */}
                            <Box
                                sx={{
                                    bgcolor: "#faf7f4",
                                    p: 1.5,
                                    borderRadius: "6px",
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                                    gap: 1.5,
                                    mb: 3,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <LocalShippingOutlinedIcon sx={{ color: "#705f56", fontSize: 18 }} />
                                    <Typography sx={{ fontSize: "0.72rem", color: "#4a3b34" }}>50 AZN+ Pulsuz çatdırılma</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <VerifiedOutlinedIcon sx={{ color: "#705f56", fontSize: 18 }} />
                                    <Typography sx={{ fontSize: "0.72rem", color: "#4a3b34" }}>100% Orijinal & Təbii</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <ReplayOutlinedIcon sx={{ color: "#705f56", fontSize: 18 }} />
                                    <Typography sx={{ fontSize: "0.72rem", color: "#4a3b34" }}>14 gün zəmanətli iadə</Typography>
                                </Box>
                            </Box>

                            {/* TABLAR */}
                            <Box sx={{ display: "flex", gap: 2, borderBottom: "1px solid #efe7e1", mb: 2 }}>
                                {[
                                    { id: "about", label: "Məhsul Haqqında" },
                                    { id: "howTo", label: "İstifadə Qaydası" },
                                    { id: "ingredients", label: "Təbii Tərkib" },
                                ].map((tab) => (
                                    <Button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        sx={{
                                            p: "6px 0",
                                            fontSize: "0.82rem",
                                            fontWeight: activeTab === tab.id ? 700 : 500,
                                            color: activeTab === tab.id ? "#241e1b" : "#8a7b73",
                                            borderBottom: activeTab === tab.id ? "2px solid #241e1b" : "none",
                                            borderRadius: 0,
                                            textTransform: "none",
                                            minWidth: "auto",
                                            "&:hover": { bgcolor: "transparent", color: "#241e1b" },
                                        }}
                                    >
                                        {tab.label}
                                    </Button>
                                ))}
                            </Box>

                            {/* TAB MƏZMUNU */}
                            <Box sx={{ minHeight: "80px" }}>
                                {activeTab === "about" && (
                                    <Typography sx={{ fontSize: "0.84rem", color: "#544640", lineHeight: 1.65 }}>
                                        {product.details}
                                    </Typography>
                                )}

                                {activeTab === "howTo" && (
                                    <Typography sx={{ fontSize: "0.84rem", color: "#544640", lineHeight: 1.65 }}>
                                        {product.usage}
                                    </Typography>
                                )}

                                {activeTab === "ingredients" && (
                                    <Typography sx={{ fontSize: "0.84rem", color: "#544640", lineHeight: 1.65 }}>
                                        {product.ingredients}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ProductDetail;