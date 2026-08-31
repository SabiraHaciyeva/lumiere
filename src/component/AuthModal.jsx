import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useAuth } from "../provider/AuthProvider";

const TEXT_DARK = "#2c221e";
const TEXT_LIGHT = "#7a6b63";
const BEIGE_BTN = "#8c7365";
const BORDER_COLOR = "#e8ded7";

export default function AuthModal({ open, onClose }) {
  const { login, register, loginWithGoogle } = useAuth();
  
  const [mode, setMode] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setAgreeTerms(false);
    if (onClose) onClose();
  };

  const handleSwitchMode = (newMode) => {
    setError("");
    setMode(newMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      if (!email.trim() || !password) {
        setError("Zəhmət olmasa, bütün sahələri doldurun.");
        return;
      }
      const res = login(email, password);
      if (!res?.success) {
        setError(res?.message || "Giriş uğursuz oldu.");
      } else {
        handleClose();
      }
    } else {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
        setError("Zəhmət olmasa, bütün sahələri doldurun.");
        return;
      }
      if (password.length < 6) {
        setError("Şifrə minimum 6 simvol olmalıdır.");
        return;
      }
      if (!agreeTerms) {
        setError("İstifadə şərtlərini qəbul etməlisiniz.");
        return;
      }
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const res = register(fullName, email, password);
      if (!res?.success) {
        setError(res?.message || "Qeydiyyat uğursuz oldu.");
      } else {
        handleClose();
      }
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      const res = await loginWithGoogle();
      if (res?.success) {
        handleClose();
      } else {
        setError(res?.message || "Google ilə daxil olmaq mümkün olmadı.");
      }
    } catch (err) {
      setError("Xəta baş verdi: " + err.message);
    }
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            p: { xs: 3, sm: 4 },
            bgcolor: "#fdfbf9",
            boxShadow: "0 20px 45px rgba(44,34,30,0.15)",
            position: "relative",
          },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: TEXT_DARK,
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <DialogContent sx={{ p: 0, mt: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 500,
              color: TEXT_DARK,
              mb: 0.8,
            }}
          >
            {mode === "login" ? "Daxil ol" : "Qeydiyyat"}
          </Typography>
          <Typography sx={{ color: TEXT_LIGHT, fontSize: "0.83rem" }}>
            {mode === "login"
              ? "Hesabına daxil olaraq alış-verişini davam et"
              : "Yeni hesab yarat və xüsusi üstünlüklər əldə et"}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: "0.8rem", py: 0.5, borderRadius: "8px" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {mode === "register" && (
            <>
              <Box>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                  Ad
                </Typography>
                <TextField
                  placeholder="Adınızı daxil edin"
                  size="small"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      "& fieldset": { borderColor: BORDER_COLOR },
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
                  Soyad
                </Typography>
                <TextField
                  placeholder="Soyadınızı daxil edin"
                  size="small"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      "& fieldset": { borderColor: BORDER_COLOR },
                    },
                  }}
                />
              </Box>
            </>
          )}

          <Box>
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.6 }}>
              E-poçt ünvanı
            </Typography>
            <TextField
              placeholder="example@mail.com"
              type="email"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: BORDER_COLOR },
                },
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.6 }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK }}>
                Şifrə
              </Typography>
              {mode === "login" && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#998b82",
                    cursor: "pointer",
                    "&:hover": { color: TEXT_DARK, textDecoration: "underline" },
                  }}
                >
                  Şifrəni unutmusunuz?
                </Typography>
              )}
            </Box>

            <TextField
              placeholder={mode === "login" ? "Şifrənizi daxil edin" : "Minimum 6 simvol"}
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: TEXT_LIGHT }}>
                      {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: BORDER_COLOR },
                },
              }}
            />
          </Box>

          {mode === "register" && (
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{ color: BORDER_COLOR, "&.Mui-checked": { color: TEXT_DARK }, p: 0.5 }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.75rem", color: TEXT_LIGHT }}>
                  Mən istifadə şərtləri və məxfilik siyasəti ilə razıyam
                </Typography>
              }
              sx={{ m: 0 }}
            />
          )}

          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: mode === "login" ? TEXT_DARK : BEIGE_BTN,
              color: "#ffffff",
              py: 1.2,
              mt: 0.5,
              borderRadius: "8px",
              textTransform: "uppercase",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "1px",
              "&:hover": { bgcolor: mode === "login" ? "#1f1714" : "#796255" },
            }}
          >
            {mode === "login" ? "Daxil ol" : "Qeydiyyatdan keç"}
          </Button>

          {mode === "login" && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", my: 0.5 }}>
                <Divider sx={{ flex: 1, borderColor: BORDER_COLOR }} />
                <Typography sx={{ px: 1.5, fontSize: "0.75rem", color: "#998b82" }}>və ya</Typography>
                <Divider sx={{ flex: 1, borderColor: BORDER_COLOR }} />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleAuth}
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                }
                sx={{
                  color: TEXT_DARK,
                  borderColor: BORDER_COLOR,
                  bgcolor: "#ffffff",
                  py: 1.1,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  "&:hover": { borderColor: TEXT_DARK, bgcolor: "#ffffff" },
                }}
              >
                Google ilə daxil ol
              </Button>
            </>
          )}

          <Box sx={{ textAlign: "center", mt: 1 }}>
            {mode === "login" ? (
              <Typography sx={{ fontSize: "0.8rem", color: TEXT_LIGHT }}>
                Hesabın yoxdur?{" "}
                <span
                  onClick={() => handleSwitchMode("register")}
                  style={{ color: "#9c7c68", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                >
                  Qeydiyyatdan keç
                </span>
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "0.8rem", color: TEXT_LIGHT }}>
                Artıq hesabın var?{" "}
                <span
                  onClick={() => handleSwitchMode("login")}
                  style={{ color: "#9c7c68", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                >
                  Daxil ol
                </span>
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}