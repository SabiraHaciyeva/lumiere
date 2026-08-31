import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  Avatar,
  Stack,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const TEXT_DARK = "#2c221e";
const TEXT_LIGHT = "#7a6b63";
const ACCENT_BEIGE = "#8c7365";
const BORDER_COLOR = "#eee6e0";

const formatAzerbaijanPhone = (rawVal) => {
  if (!rawVal) return "+994 ";

  let digits = rawVal.replace(/\D/g, "");

  if (digits.startsWith("994")) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 9);

  if (digits.length === 0) {
    return "+994 ";
  }

  let formatted = "+994 ";
  if (digits.length <= 2) {
    formatted += digits;
  } else if (digits.length <= 5) {
    formatted += `${digits.slice(0, 2)} ${digits.slice(2)}`;
  } else if (digits.length <= 7) {
    formatted += `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  } else {
    formatted += `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
  }

  return formatted;
};

export default function ProfilePage() {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+994 ");
  const [address, setAddress] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "");
      setPhone(currentUser.phone ? formatAzerbaijanPhone(currentUser.phone) : "+994 ");
      setAddress(currentUser.address || "");
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Box sx={{ pt: 20, pb: 12, textAlign: "center", bgcolor: "#faf7f4", minHeight: "100vh" }}>
        <Typography sx={{ color: TEXT_DARK, mb: 3, fontSize: "1.1rem" }}>
          Bu səhifəni görmək üçün hesabınıza daxil olmalısınız.
        </Typography>
        <Button
          onClick={() => navigate("/")}
          sx={{
            bgcolor: TEXT_DARK,
            color: "#fff",
            px: 4,
            py: 1.2,
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": { bgcolor: "#443631" },
          }}
        >
          Ana səhifəyə qayıt
        </Button>
      </Box>
    );
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!val.startsWith("+994")) {
      setPhone("+994 ");
      return;
    }
    setPhone(formatAzerbaijanPhone(val));
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.selectionStart <= 5 && e.target.selectionEnd <= 5) {
      e.preventDefault();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ fullName, phone, address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ bgcolor: "#faf7f5", minHeight: "100vh", pt: { xs: "105px", md: "130px" }, pb: 10 }}>
      <Container maxWidth="lg">
        {/* ÜST BAŞLIQ */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TEXT_DARK,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
              mb: 0.5,
            }}
          >
            Şəxsi Hesab
          </Typography>
          <Typography sx={{ color: TEXT_LIGHT, fontSize: "0.88rem" }}>
            Xoş gəldiniz, <strong>{currentUser.fullName}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {/* SOL: MENYU KARTI */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "14px",
                border: `1px solid ${BORDER_COLOR}`,
                bgcolor: "#ffffff",
                boxShadow: "0 4px 20px rgba(44,34,30,0.03)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar
                  src={currentUser.avatar || ""}
                  sx={{
                    bgcolor: ACCENT_BEIGE,
                    color: "#ffffff",
                    width: 56,
                    height: 56,
                    fontSize: "1.3rem",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "U"}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography sx={{ fontWeight: 600, color: TEXT_DARK, fontSize: "0.95rem" }} noWrap>
                    {currentUser.fullName}
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: TEXT_LIGHT }} noWrap>
                    {currentUser.email}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2, borderColor: BORDER_COLOR }} />

              <Stack spacing={1}>
                <Button
                  fullWidth
                  startIcon={<PersonOutlineOutlinedIcon />}
                  onClick={() => setActiveTab("info")}
                  sx={{
                    justifyContent: "flex-start",
                    py: 1.2,
                    px: 2,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.88rem",
                    fontWeight: activeTab === "info" ? 600 : 500,
                    bgcolor: activeTab === "info" ? "#f5ede8" : "transparent",
                    color: activeTab === "info" ? TEXT_DARK : TEXT_LIGHT,
                    "&:hover": { bgcolor: "#f5ede8", color: TEXT_DARK },
                  }}
                >
                  Şəxsi Məlumatlar
                </Button>

                <Button
                  fullWidth
                  startIcon={<ShoppingBagOutlinedIcon />}
                  onClick={() => setActiveTab("orders")}
                  sx={{
                    justifyContent: "flex-start",
                    py: 1.2,
                    px: 2,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.88rem",
                    fontWeight: activeTab === "orders" ? 600 : 500,
                    bgcolor: activeTab === "orders" ? "#f5ede8" : "transparent",
                    color: activeTab === "orders" ? TEXT_DARK : TEXT_LIGHT,
                    "&:hover": { bgcolor: "#f5ede8", color: TEXT_DARK },
                  }}
                >
                  Sifarişlərim ({currentUser.orders?.length || 0})
                </Button>

                <Divider sx={{ my: 1, borderColor: BORDER_COLOR }} />

                <Button
                  fullWidth
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    justifyContent: "flex-start",
                    py: 1.2,
                    px: 2,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.88rem",
                    color: "#a83226",
                    "&:hover": { bgcolor: "#fdf2f1" },
                  }}
                >
                  Hesabdan çıxış
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* SAĞ PANEL */}
          <Grid size={{ xs: 12, md: 8 }}>
            {activeTab === "info" && (
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "14px",
                  border: `1px solid ${BORDER_COLOR}`,
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(44,34,30,0.03)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: TEXT_DARK,
                    mb: 0.5,
                  }}
                >
                  Məlumatları Redaktə Et
                </Typography>
                <Typography sx={{ color: TEXT_LIGHT, fontSize: "0.82rem", mb: 3 }}>
                  Sifarişlərinizin çatdırılması üçün şəxsi məlumatlarınızı yeniləyin.
                </Typography>

                {savedSuccess && (
                  <Alert
                    icon={<CheckCircleOutlinedIcon fontSize="inherit" />}
                    severity="success"
                    sx={{ mb: 3, borderRadius: "8px", fontSize: "0.85rem", bgcolor: "#f0f7f2", color: "#1e5e2e" }}
                  >
                    Məlumatlar uğurla yadda saxlanıldı!
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSave} sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
                  <Box>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                      Ad və Soyad
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": { borderColor: BORDER_COLOR },
                          "&:hover fieldset": { borderColor: TEXT_DARK },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                      E-poçt ünvanı
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      disabled
                      value={currentUser.email}
                      helperText="E-poçt ünvanı dəyişdirilə bilməz"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          bgcolor: "#faf8f6",
                          "& fieldset": { borderColor: BORDER_COLOR },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                      Əlaqə Nömrəsi
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      placeholder="+994 50 000 00 00"
                      slotProps={{
                        htmlInput: { maxLength: 17 },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": { borderColor: BORDER_COLOR },
                          "&:hover fieldset": { borderColor: TEXT_DARK },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                      Çatdırılma Ünvanı
                    </Typography>
                    <TextField
                      size="small"
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="Şəhər, rayon, küçə, bina və mənzil nömrəsi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": { borderColor: BORDER_COLOR },
                          "&:hover fieldset": { borderColor: TEXT_DARK },
                        },
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: TEXT_DARK,
                      color: "#ffffff",
                      px: 4,
                      py: 1.1,
                      mt: 1,
                      borderRadius: "8px",
                      textTransform: "uppercase",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      "&:hover": { bgcolor: "#443631" },
                    }}
                  >
                    Yadda saxla
                  </Button>
                </Box>
              </Paper>
            )}

            {activeTab === "orders" && (
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "14px",
                  border: `1px solid ${BORDER_COLOR}`,
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(44,34,30,0.03)",
                  textAlign: "center",
                  py: 8,
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: "#d1c2b8", mb: 1.5 }} />
                <Typography sx={{ fontWeight: 600, color: TEXT_DARK, mb: 0.5, fontSize: "1.05rem" }}>
                  Hələ heç bir sifarişiniz yoxdur
                </Typography>
                <Typography sx={{ color: TEXT_LIGHT, fontSize: "0.85rem", mb: 3 }}>
                  Kolleksiyalarımıza baxaraq ilk sifarişinizi indi verin.
                </Typography>
                <Button
                  onClick={() => navigate("/collections")}
                  sx={{
                    bgcolor: ACCENT_BEIGE,
                    color: "#ffffff",
                    textTransform: "none",
                    px: 3.5,
                    py: 1.1,
                    borderRadius: "8px",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "#796255" },
                  }}
                >
                  Kolleksiyalara bax
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}