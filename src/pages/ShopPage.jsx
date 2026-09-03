import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import {
    Box,
    Container,
    Typography,
    Slider,
    MenuItem,
    Select,
    FormControl,
    Button,
    Checkbox,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Pagination,
    TextField,
    IconButton,
    Drawer,
    useMediaQuery,
    useTheme,
    CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

// import { products } from "../data/product";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../component/ProductCard";

// =========================================================================
// HƏRF NORMALLAŞDIRMA FUNKSİYASI (Azərbaycan hərfləri daxil)
// =========================================================================
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

// =========================================================================
// DİNAMİK FİLTR XƏRİTƏSİ
// =========================================================================
const dynamicFilterConfig = {
    face: {
        subGroupTitle: "Üz Kateqoriyaları",
        subGroups: [
            { label: "Təmizləyici Gellər & Köpüklər", val: "cleansers" },
            { label: "Toniklər & Mislər", val: "toners" },
            { label: "Zərdablar & Serumlar", val: "serums" },
            { label: "Nəmləndirici & Qidalandırıcı Kremlər", val: "moisturisers" },
            { label: "Göz Ətrafı Qulluq", val: "eye-care" },
            { label: "Dodaq Balzamları & Maskaları", val: "lip-care" },
        ],
        tagTitle: "Dəri tipi",
        tags: [
            { label: "Quru dəri", val: "dry" },
            { label: "Yağlı dəri", val: "oily" },
            { label: "Həssas dəri", val: "sensitive" },
            { label: "Normal dəri", val: "normal" },
            { label: "Kombinə dəri", val: "combination" },
        ],
    },
    body: {
        subGroupTitle: "Bədən Kateqoriyaları",
        subGroups: [
            { label: "Bədən Losyonları & Yağları", val: "lotions" },
            { label: "Bədən Skrabları", val: "scrubs" },
            { label: "Duş Gelləri & Vanna Köpükləri", val: "bath-shower" },
            { label: "Əl & Dırnaq Kremləri", val: "hand-care" },
            { label: "Ayaq Baxımı", val: "foot-care" },
        ],
        tagTitle: "Təsir Növü",
        tags: [
            { label: "Nəmləndirici", val: "hydrating" },
            { label: "Qidalandırıcı", val: "nourishing" },
            { label: "Yumşaldıcı", val: "smoothing" },
            { label: "Rahatlaşdırıcı", val: "relaxing" },
        ],
    },
    hair: {
        subGroupTitle: "Saç Kateqoriyaları",
        subGroups: [
            { label: "Şampunlar & Balzamlar", val: "shampoos" },
            { label: "Bərpaedici Maskalar & Yağlar", val: "masks" },
            { label: "Baş Dərisi Baxımı", val: "scalp" },
            { label: "Staylinq Spreyləri & Qoruyucular", val: "styling" },
        ],
        tagTitle: "Saç Ehtiyacı",
        tags: [
            { label: "Quru & Zədəli", val: "damaged" },
            { label: "Həcm Verən", val: "volume" },
            { label: "Parlaqlıq", val: "shine" },
        ],
    },
    fragrance: {
        subGroupTitle: "Ətir Növləri",
        subGroups: [
            { label: "Parfümlər (Eau de Parfum)", val: "edp" },
            { label: "Bədən Spreyləri (Body Mists)", val: "mists" },
            { label: "Aromatik Şamlar & Ev Qoxuları", val: "candles" },
        ],
        tagTitle: "Qoxu Ailəsi",
        tags: [
            { label: "Çiçəkli", val: "floral" },
            { label: "Odunsu", val: "woody" },
            { label: "Şərq / Ənbər", val: "oriental" },
            { label: "Təravətli", val: "fresh" },
        ],
    },
    makeup: {
        subGroupTitle: "Makyaj Kateqoriyaları",
        subGroups: [
            { label: "Tonal Kremlər & Korrektorlar", val: "face-makeup" },
            { label: "Pudralar & Ənliklər", val: "powders" },
            { label: "Göz Kölgələri & Laynerlər", val: "eyes" },
            { label: "Dodaq Boyaları & Parıldadıcılar", val: "lips" },
            { label: "Makyaj Fırçaları & Süngərlər", val: "tools" },
        ],
        tagTitle: "Finiş Təsiri",
        tags: [
            { label: "Mat", val: "matte" },
            { label: "Parlaq (Glow)", val: "glow" },
            { label: "Qalıcı", val: "long-lasting" },
        ],
    },
    collections: {
        subGroupTitle: "Kolleksiyalar",
        subGroups: [
            { label: "Ən Çox Satılanlar", val: "best-sellers" },
            { label: "Yay Kolleksiyası", val: "summer" },
            { label: "Hədiyyə Dəstləri", val: "gift-sets" },
            { label: "Limitli Sayda", val: "limited" },
        ],
        tagTitle: "Bölmə",
        tags: [
            { label: "Üz Baxımı", val: "face" },
            { label: "Bədən Baxımı", val: "body" },
            { label: "Saç Baxımı", val: "hair" },
            { label: "Ətirlər", val: "fragrance" },
            { label: "Makyaj", val: "makeup" },
        ],
    },
    new: {
        subGroupTitle: "Məhsul Tipi",
        subGroups: [
            { label: "Yeni Məhsullar", val: "products" },
            { label: "Baxım və Hədiyyə Dəstləri", val: "sets" },
        ],
        tagTitle: "Bölmə",
        tags: [
            { label: "Üz Baxımı", val: "face" },
            { label: "Bədən Baxımı", val: "body" },
            { label: "Saç Baxımı", val: "hair" },
            { label: "Ətirlər", val: "fragrance" },
            { label: "Makyaj", val: "makeup" },
        ],
    },
    sale: {
        subGroupTitle: "Endirim Kateqoriyası",
        subGroups: [
            { label: "20%-dək Endirimlər", val: "under-20" },
            { label: "30% və Daha Çox", val: "over-30" },
        ],
        tagTitle: "Bölmə",
        tags: [
            { label: "Üz Baxımı", val: "face" },
            { label: "Bədən Baxımı", val: "body" },
            { label: "Saç Baxımı", val: "hair" },
            { label: "Ətirlər", val: "fragrance" },
            { label: "Makyaj", val: "makeup" },
        ],
    },
};

const discountList = [
    { label: "10% və daha çox", val: 10 },
    { label: "20% və daha çox", val: 20 },
    { label: "30% və daha çox", val: 30 },
];

function ShopPage() {
    const { products, loading } = useProducts();
    const { category, subCategory } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")?.trim() || "";

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));//responsiv lg ucun

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // =========================================================================
    // DÜZƏLİŞ 1: BÜTÜN STATE-LƏR YUXARIYA ÇIXARILDI
    // (XƏTANIN ƏSAS SƏBƏBİ: Əvvəl currentPage aşağıda idi, amma yuxarıdakı useEffect onu çağırırdı.
    // İndi bütün useState-lər useEffect-dən ƏVVƏL gəlir və initialization xətası aradan qaldırıldı.)
    // =========================================================================
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(150);
    const [selectedSubGroups, setSelectedSubGroups] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [selectedSort, setSelectedSort] = useState("bestseller");

    const [columnsCount, setColumnsCount] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    // =========================================================================
    // DÜZƏLİŞ 2: YUXARI SÜRÜŞDÜRMƏ (SCROLL TO TOP) EFFEKTİ
    // (Buraya currentPage əlavə olundu: Artıq həm kateqoriya dəyişəndə, həm də pagination-da
    // istər 1, 2, 3 rəqəmlərinə, istərsə də < və > oxlarına basanda səhifə dərhal və hamar başa qalxır.)
    // =========================================================================
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [category, subCategory, currentPage]);

    const itemsPerPage = isLargeDesktop ? columnsCount * 2 : 12;//resposiv duzelis
    useEffect(() => {
        if (!isLargeDesktop && columnsCount === 5) {
            setColumnsCount(4);
        }
    }, [isLargeDesktop, columnsCount]);
    useEffect(() => {
        setSelectedSubGroups(subCategory ? [subCategory] : []);
        setSelectedTags([]);
        setCurrentPage(1);
    }, [category, subCategory]);

    const currentConfig = dynamicFilterConfig[category] || dynamicFilterConfig.collections;

    const handleSubGroupToggle = (val) => {
        setSelectedSubGroups((prev) =>
            prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
        );
        setCurrentPage(1);
    };

    const handleTagToggle = (val) => {
        setSelectedTags((prev) =>
            prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
        );
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setMinPrice(0);
        setMaxPrice(150);
        setSelectedSubGroups(subCategory ? [subCategory] : []);
        setSelectedTags([]);
        setSelectedDiscount(null);
        setCurrentPage(1);
    };

    // =========================================================================
    // MƏHSULLARI SÜZGƏCDƏN KEÇİRMƏ (Tam Dəqiq Başlanğıc Yoxlaması)
    // =========================================================================
    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        return products
            .filter((item) => {
                // 0. AXTARIŞ (startsWith)
                if (searchQuery) {
                    const cleanQuery = normalizeStr(searchQuery);
                    const cleanName = normalizeStr(item.name);

                    if (!cleanName.startsWith(cleanQuery)) {
                        return false;
                    }
                }

                // 1. ENDİRİMLƏR MENYUSU (/sale)
                if (category === "sale") {
                    if (!item.oldPrice) return false;
                    const discountPercent = ((item.oldPrice - item.price) / item.oldPrice) * 100;

                    if (selectedSubGroups.length > 0) {
                        const matchesUnder20 = selectedSubGroups.includes("under-20") && discountPercent <= 20;
                        const matchesOver30 = selectedSubGroups.includes("over-30") && discountPercent >= 30;
                        if (!matchesUnder20 && !matchesOver30) return false;
                    }

                    if (selectedTags.length > 0 && !selectedTags.includes(item.category)) {
                        return false;
                    }
                }

                // 2. YENİ GƏLƏNLƏR MENYUSU (/new)
                else if (category === "new") {
                    if (!item.isNew) return false;

                    if (selectedSubGroups.length > 0) {
                        const matchesProducts = selectedSubGroups.includes("products") && !item.isSet;
                        const matchesSets = selectedSubGroups.includes("sets") && item.isSet;
                        if (!matchesProducts && !matchesSets) return false;
                    }

                    if (selectedTags.length > 0 && !selectedTags.includes(item.category)) {
                        return false;
                    }
                }

                // 3. KOLLEKSİYALAR (/collections)
                else if (category === "collections") {
                    if (selectedSubGroups.length > 0) {
                        const matchCol = selectedSubGroups.some((col) => item.collections?.includes(col));
                        if (!matchCol) return false;
                    } else {
                        if (!item.collections || item.collections.length === 0) return false;
                    }

                    if (selectedTags.length > 0 && !selectedTags.includes(item.category)) {
                        return false;
                    }
                }

                // 4. ƏSAS KATEQORİYALAR (face, body, hair, fragrance, makeup)
                else if (category) {
                    if (item.category?.toLowerCase() !== category.toLowerCase()) return false;

                    if (selectedSubGroups.length > 0 && !selectedSubGroups.includes(item.subCategory)) {
                        return false;
                    }

                    if (selectedTags.length > 0) {
                        const hasTag = selectedTags.some((t) => item.tags?.includes(t));
                        if (!hasTag) return false;
                    }
                }

                // 5. QİYMƏT ARALIĞI
                if (item.price < minPrice || item.price > maxPrice) return false;

                // 6. ENDİRİM FAİZİ FİLTRİ
                if (selectedDiscount) {
                    if (!item.oldPrice) return false;
                    const discount = ((item.oldPrice - item.price) / item.oldPrice) * 100;
                    if (discount < selectedDiscount) return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (selectedSort === "price-low") return a.price - b.price;
                if (selectedSort === "price-high") return b.price - a.price;
                if (selectedSort === "nameA-Z") return a.name.localeCompare(b.name, "az");
                return 0;
            });
    }, [
        products,
        category,
        searchQuery,
        minPrice,
        maxPrice,
        selectedSubGroups,
        selectedTags,
        selectedDiscount,
        selectedSort,
    ]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const FilterContent = (
        <Box sx={{ p: { xs: 2.5, md: 0 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1px", color: "#2c221e" }}>
                    FİLTRLƏR
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                        onClick={resetFilters}
                        sx={{ fontSize: "0.75rem", color: "#705f56", p: 0, textTransform: "none" }}
                    >
                        Təmizlə
                    </Button>
                    {!isDesktop && (
                        <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* 1. QİYMƏT */}
            {/* 1. QİYMƏT */}
            <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />} sx={{ p: 0, minHeight: 38 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c221e" }}>Qiymət</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: "0 0 14px 0" }}>
                    <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(e, val) => {
                            setMinPrice(val[0]);
                            setMaxPrice(val[1]);
                            setCurrentPage(1);
                        }}
                        min={0}
                        max={150}
                        sx={{
                            color: "#2c221e",
                            height: 3,
                            mb: 1.5,
                            "& .MuiSlider-thumb": { width: 12, height: 12, bgcolor: "#2c221e" },
                        }}
                    />
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <TextField
                            size="small"
                            type="text"
                            inputMode="numeric"
                            value={minPrice === 0 ? "" : minPrice}
                            placeholder="0"
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, "");
                                const num = val === "" ? 0 : Math.min(150, Number(val));
                                setMinPrice(num);
                                setCurrentPage(1);
                            }}
                            slotProps={{
                                htmlInput: {
                                    sx: {
                                        fontSize: "0.8rem",
                                        py: 0.6,
                                        px: 0.5,
                                        textAlign: "center",
                                    },
                                },
                            }}
                            sx={{
                                bgcolor: "#fff",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e6ded8" },
                            }}
                        />
                        <Typography sx={{ fontSize: "0.8rem", color: "#998b82", fontWeight: 600 }}>-</Typography>
                        <TextField
                            size="small"
                            type="text"
                            inputMode="numeric"
                            value={maxPrice === 0 ? "" : maxPrice}
                            placeholder="150"
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, "");
                                const num = val === "" ? 0 : Math.min(150, Number(val));
                                setMaxPrice(num);
                                setCurrentPage(1);
                            }}
                            slotProps={{
                                htmlInput: {
                                    sx: {
                                        fontSize: "0.8rem",
                                        py: 0.6,
                                        px: 0.5,
                                        textAlign: "center",
                                    },
                                },
                            }}
                            sx={{
                                bgcolor: "#fff",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e6ded8" },
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 2. DİNAMİK ALT BÖLMƏ */}
            {currentConfig.subGroups && (
                <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />} sx={{ p: 0, minHeight: 38 }}>
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c221e" }}>
                            {currentConfig.subGroupTitle}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: "0 0 8px 0" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                            {currentConfig.subGroups.map((sub) => (
                                <FormControlLabel
                                    key={sub.val}
                                    sx={{ width: "100%", m: 0 }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={selectedSubGroups.includes(sub.val)}
                                            onChange={() => handleSubGroupToggle(sub.val)}
                                            sx={{ color: "#d1c4bc", "&.Mui-checked": { color: "#2c221e" }, py: 0.3, pr: 1 }}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: "0.8rem", color: "#4a3b34" }}>{sub.label}</Typography>}
                                />
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            )}

            {/* 3. DİNAMİK XÜSUSİYYƏT */}
            {currentConfig.tags && (
                <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />} sx={{ p: 0, minHeight: 38 }}>
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c221e" }}>
                            {currentConfig.tagTitle}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: "0 0 8px 0" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                            {currentConfig.tags.map((t) => (
                                <FormControlLabel
                                    key={t.val}
                                    sx={{ width: "100%", m: 0 }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={selectedTags.includes(t.val)}
                                            onChange={() => handleTagToggle(t.val)}
                                            sx={{ color: "#d1c4bc", "&.Mui-checked": { color: "#2c221e" }, py: 0.3, pr: 1 }}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: "0.8rem", color: "#4a3b34" }}>{t.label}</Typography>}
                                />
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            )}

            {/* 4. ENDİRİM */}
            <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />} sx={{ p: 0, minHeight: 38 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c221e" }}>Endirim</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: "0 0 8px 0" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                        {discountList.map((d) => (
                            <FormControlLabel
                                key={d.val}
                                sx={{ width: "100%", m: 0 }}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={selectedDiscount === d.val}
                                        onChange={() => {
                                            setSelectedDiscount(selectedDiscount === d.val ? null : d.val);
                                            setCurrentPage(1);
                                        }}
                                        sx={{ color: "#d1c4bc", "&.Mui-checked": { color: "#2c221e" }, py: 0.3, pr: 1 }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "0.8rem", color: "#4a3b34" }}>{d.label}</Typography>}
                            />
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress sx={{ color: "#8c7365" }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: "#faf7f4",
                pt: { xs: 13, sm: 14, md: 15, lg: 16 },
                pb: { xs: 5, md: 7 },
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2.5, md: 3 } }}>

                {/* ÜST İDARƏETMƏ BARI */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                        mb: { xs: 2, md: 3 },
                    }}
                >
                    {/* Sol: Məhsul Sayı və Mobil Filtr Düyməsi */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        {!isDesktop && (
                            <Button
                                variant="outlined"
                                onClick={() => setMobileFilterOpen(true)}
                                startIcon={<TuneIcon sx={{ fontSize: "16px !important" }} />}
                                sx={{
                                    color: "#2c221e",
                                    borderColor: "#d9ccc3",
                                    bgcolor: "#ffffff",
                                    fontSize: "0.78rem",
                                    textTransform: "none",
                                    py: 0.5,
                                    px: 1.5,
                                    "&:hover": { borderColor: "#2c221e", bgcolor: "#fff" },
                                }}
                            >
                                Filtrlər
                            </Button>
                        )}

                        <Typography sx={{ fontWeight: 600, color: "#2c221e", fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                            {filteredProducts.length} məhsul
                        </Typography>
                    </Box>

                    {/* Sağ: Sıralama və Desktop Sütun Düymələri */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, ml: "auto" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.8rem", color: "#705f56", display: { xs: "none", sm: "block" } }}>
                                Sırala:
                            </Typography>
                            <FormControl size="small">
                                <Select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    sx={{
                                        bgcolor: "#fff",
                                        fontSize: "0.78rem",
                                        borderRadius: "4px",
                                        height: 34,
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e6ded8" },
                                    }}
                                >
                                    <MenuItem value="bestseller">Ən çox satılanlar</MenuItem>
                                    <MenuItem value="price-low">Qiymət: Ucuzdan Bahaya</MenuItem>
                                    <MenuItem value="price-high">Qiymət: Bahadan Ucuza</MenuItem>
                                    <MenuItem value="nameA-Z">A-dan Z-yə</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5 }}>
                            <IconButton
                                onClick={() => { setColumnsCount(3); setCurrentPage(1); }}
                                title="3 Sütun"
                                sx={{
                                    width: 34,
                                    height: 34,
                                    bgcolor: columnsCount === 3 ? "#2c221e" : "#fff",
                                    border: "1px solid #e6ded8",
                                    color: columnsCount === 3 ? "#fff" : "#705f56",
                                    borderRadius: "4px",
                                    "&:hover": { bgcolor: columnsCount === 3 ? "#453630" : "#f5ede7" },
                                }}
                            >
                                <ViewColumnIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={() => { setColumnsCount(4); setCurrentPage(1); }}
                                title="4 Sütun"
                                sx={{
                                    width: 34,
                                    height: 34,
                                    bgcolor: columnsCount === 4 ? "#2c221e" : "#fff",
                                    border: "1px solid #e6ded8",
                                    color: columnsCount === 4 ? "#fff" : "#705f56",
                                    borderRadius: "4px",
                                    "&:hover": { bgcolor: columnsCount === 4 ? "#453630" : "#f5ede7" },
                                }}
                            >
                                <GridViewIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={() => { setColumnsCount(5); setCurrentPage(1); }}
                                title="5 Sütun"
                                sx={{
                                    width: 34,
                                    height: 34,
                                    bgcolor: columnsCount === 5 ? "#2c221e" : "#fff",
                                    border: "1px solid #e6ded8",
                                    color: columnsCount === 5 ? "#fff" : "#705f56",
                                    borderRadius: "4px",
                                    "&:hover": { bgcolor: columnsCount === 5 ? "#453630" : "#f5ede7" },
                                }}
                            >
                                <ViewComfyIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                {/* ƏSAS MƏZMUN (SOL FİLTR + SAĞ MƏHSULLAR) */}
                <Box sx={{ display: "flex", gap: { md: 2.5, lg: 3.5 }, alignItems: "flex-start" }}>

                    {/* SOL: DESKTOP FİLTR */}
                    {isDesktop && (
                        <Box
                            sx={{
                                width: { md: 220, lg: 240 },
                                flexShrink: 0,
                                bgcolor: "#ffffff",
                                borderRadius: "8px",
                                border: "1px solid #efe7e1",
                                p: 2,
                                position: "sticky",
                                top: { md: 100, lg: 120 }, // Header-in altından səliqəli yapışaraq qalır
                                alignSelf: "flex-start",
                                maxHeight: "calc(100vh - 140px)",
                                overflowY: "auto", // Filtr uzanarsa daxilində skroll olur
                                overflowX: "hidden",
                                "&::-webkit-scrollbar": { width: 4 },
                                "&::-webkit-scrollbar-thumb": { bgcolor: "#e0d4cb", borderRadius: 2 },
                            }}
                        >
                            {FilterContent}
                        </Box>
                    )}

                    {/* MOBİL FİLTR */}
                    <Drawer
                        anchor="left"
                        open={mobileFilterOpen}
                        onClose={() => setMobileFilterOpen(false)}
                        ModalProps={{ disableRestoreFocus: true }}
                        slotProps={{
                            paper: {
                                sx: { width: 280, bgcolor: "#fff" },
                            },
                        }}
                        sx={{ zIndex: 1400 }}
                    >
                        {FilterContent}
                    </Drawer>

                    {/* SAĞ: MƏHSULLAR TORU */}
                    <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>

                        {/* AXTARIŞ BİLDİRİŞİ VƏ SIFIRLAMA */}
                        {searchQuery && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Typography sx={{ fontSize: "0.85rem", color: "#544640" }}>
                                    <strong>"{searchQuery}"</strong> ilə başlayan məhsullar
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => setSearchParams({})}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "0.75rem",
                                        color: "#910e04",
                                        p: 0,
                                        minWidth: "auto",
                                        textDecoration: "underline",
                                        "&:hover": { bgcolor: "transparent" },
                                    }}
                                >
                                    (təmizlə)
                                </Button>
                            </Box>
                        )}

                        {paginatedProducts.length === 0 ? (
                            <Box sx={{ textAlign: "center", py: 8, bgcolor: "#fff", borderRadius: "8px", border: "1px solid #efe7e1" }}>
                                <Typography sx={{ color: "#705f56", fontSize: "0.9rem" }}>
                                    Seçiminizə uyğun məhsul tapılmadı.
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "repeat(2, 1fr)",
                                        sm: "repeat(3, 1fr)",
                                        md: "repeat(3, 1fr)",
                                        lg: `repeat(${columnsCount}, 1fr)`,
                                    },
                                    gap: { xs: 1, sm: 1.5, md: 1.5, lg: columnsCount === 5 ? 1.2 : 2 },
                                }}
                            >
                                {paginatedProducts.map((item) => (
                                    <ProductCard key={item.id} product={item} columnsCount={columnsCount} />
                                ))}
                            </Box>
                        )}

                        {/* SƏHİFƏLƏMƏ (PAGINATION) */}
                        {totalPages > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 5 } }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    size={isDesktop ? "medium" : "small"}
                                    onChange={(e, val) => {
                                        setCurrentPage(val);
                                        // =========================================================
                                        // DÜZƏLİŞ 3: ONCHANGE ZAMANI DA BİRBAŞA YUXARI QALXMAQ TƏMİN EDİLDİ
                                        // =========================================================
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    shape="rounded"
                                    sx={{
                                        "& .MuiPaginationItem-root": {
                                            color: "#2c221e",
                                            fontSize: { xs: "0.75rem", md: "0.82rem" },
                                            bgcolor: "#ffffff",
                                            border: "1px solid #e6ded8",
                                            borderRadius: "4px",
                                            mx: 0.3,
                                            "&.Mui-selected": {
                                                bgcolor: "#241e1b",
                                                color: "#ffffff",
                                                borderColor: "#241e1b",
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}

export default ShopPage;