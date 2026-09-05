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

// tema rengleri
const TEXT_DARK = "#2c221e";
const TEXT_LIGHT = "#7a6b63";
const BEIGE_BTN = "#8c7365";
const BORDER_COLOR = "#e8ded7";

export default function AuthModal({ open, onClose }) {
  // providerden metodlari gotururuk
  const { login, register, loginWithGoogle } = useAuth();

  // form rejim ve melumat state-leri
  const [mode, setMode] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // gorunus ve xeta state-leri
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  // modali baglayanda butun inputlari sifirlayiriq
  const handleClose = () => {
    setError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAgreeTerms(false);
    if (onClose) onClose();
  };

  // rejim kecidi (login <-> register)
  const handleSwitchMode = (newMode) => {
    setError("");
    setMode(newMode);
  };

  // xeta cixanda pencereni yuxari surusdururuk
  const triggerError = (msg) => {
    setError(msg);
    setTimeout(() => {
      const modalContent = document.getElementById("auth-dialog-content");
      if (modalContent) {
        modalContent.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  // sifrenin gorunusunu deyisende kursoru axirda saxlayiriq
  const togglePasswordVisibility = (inputId, setter) => {
    setter((prev) => !prev);
    setTimeout(() => {
      const input = document.getElementById(inputId);
      if (input) {
        input.focus();
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }, 0);
  };

  // form tesdiqi ve deqiq yoxlama zenciri
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const nameRegex = /^[a-zA-ZƏəİiIıĞğÖöŞşÜüÇç\s]+$/;

    const cleanEmail = email.trim().toLowerCase();
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();

    if (mode === "login") {
      // login ucun esas yoxlamalar
      if (!cleanEmail || !password) {
        triggerError("Zəhmət olmasa, bütün sahələri doldurun.");
        return;
      }
      if (!emailRegex.test(cleanEmail)) {
        triggerError("Düzgün e-poçt ünvanı daxil edin.");
        return;
      }

      // login icrasi
      const res = login(cleanEmail, password);
      if (!res?.success) {
        triggerError(res?.message || "Giriş uğursuz oldu.");
      } else {
        handleClose();
      }
    } else {
      // qeydiyyat ucun sahelerin dolulugu
      if (!cleanFirst || !cleanLast || !cleanEmail || !password || !confirmPassword) {
        triggerError("Zəhmət olmasa, bütün sahələri doldurun.");
        return;
      }

      // ad ve soyad uzunlugu (en azi 2 simvol)
      if (cleanFirst.length < 2 || cleanLast.length < 2) {
        triggerError("Ad və soyad minimum 2 hərfdən ibarət olmalıdır.");
        return;
      }

      // ad ve soyadda yalniz herf olmalidir (reqem ve simvollar qadagandir)
      if (!nameRegex.test(cleanFirst) || !nameRegex.test(cleanLast)) {
        triggerError("Ad və soyadda yalnız hərflərdən istifadə oluna bilər.");
        return;
      }

      // duzgun email yoxlanisi
      if (!emailRegex.test(cleanEmail)) {
        triggerError("Düzgün e-poçt ünvanı daxil edin (məs: example@mail.com).");
        return;
      }

      // sifrede probel (bosluq) olmamalidir
      if (/\s/.test(password)) {
        triggerError("Şifrədə boşluq (space) simvolundan istifadə etmək olmaz.");
        return;
      }

      // sifrenin uzunluq heddi
      if (password.length < 6 || password.length > 32) {
        triggerError("Şifrə 6 ilə 32 simvol arasında olmalıdır.");
        return;
      }

      // sifrede en azi bir herf ve bir reqem olmalidir (her cur simvol serbestdir)
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      if (!hasLetter || !hasNumber) {
        triggerError("Şifrədə ən azı bir hərf və bir rəqəm olmalıdır.");
        return;
      }

      // sifrelerin uygunlugu
      if (password !== confirmPassword) {
        triggerError("Şifrələr bir-biri ilə uyğun gəlmir.");
        return;
      }

      // qaydalarin tesdiqi
      if (!agreeTerms) {
        triggerError("İstifadə şərtlərini qəbul etməlisiniz.");
        return;
      }

      // register icrasi
      const fullName = `${cleanFirst} ${cleanLast}`;
      const res = register(fullName, cleanEmail, password);
      if (!res?.success) {
        triggerError(res?.message || "Qeydiyyat uğursuz oldu.");
      } else {
        handleClose();
      }
    }
  };

  // google ile giris
  const handleGoogleAuth = async () => {
    setError("");
    try {
      const res = await loginWithGoogle();
      if (res?.success) {
        handleClose();
      } else {
        triggerError(res?.message || "Google ilə daxil olmaq mümkün olmadı.");
      }
    } catch (err) {
      triggerError("Xəta baş verdi: " + err.message);
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
            p: { xs: 2.5, sm: 3.5 },
            bgcolor: "#fdfbf9",
            boxShadow: "0 20px 45px rgba(44,34,30,0.15)",
            position: "relative",
            maxHeight: "90vh",
          },
        },
      }}
    >
      {/* baglama duymesi */}
      <IconButton
        onClick={handleClose}
        size="small"
        aria-label="Bağla"
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          color: TEXT_DARK,
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <DialogContent id="auth-dialog-content" sx={{ p: 0, mt: 1, overflowY: "auto" }}>
        {/* modal basligi */}
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 500,
              color: TEXT_DARK,
              mb: 0.6,
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

        {/* xeta qutusu */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              fontSize: "0.82rem",
              py: 0.6,
              borderRadius: "8px",
              border: "1px solid #f5c2c7",
              animation: "fadeIn 0.3s ease",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-6px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* form sahesi */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {/* qeydiyyatda ad ve soyad */}
          {mode === "register" && (
            <>
              <Box>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.5 }}>
                  Ad
                </Typography>
                <TextField
                  id="register-firstName"
                  name="firstName"
                  placeholder="Adınızı daxil edin"
                  size="small"
                  fullWidth
                  autoComplete="given-name"
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
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.5 }}>
                  Soyad
                </Typography>
                <TextField
                  id="register-lastName"
                  name="lastName"
                  placeholder="Soyadınızı daxil edin"
                  size="small"
                  fullWidth
                  autoComplete="family-name"
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

          {/* email */}
          <Box>
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.5 }}>
              E-poçt ünvanı
            </Typography>
            <TextField
              id={mode === "login" ? "login-email" : "register-email"}
              name="email"
              placeholder="example@mail.com"
              type="email"
              size="small"
              fullWidth
              autoComplete="email"
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

          {/* sifre sahesi */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
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
              id={mode === "login" ? "login-password" : "register-password"}
              name="password"
              placeholder={mode === "login" ? "Şifrənizi daxil edin" : "Minimum 6 simvol (hərf və rəqəm)"}
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility(
                            mode === "login" ? "login-password" : "register-password",
                            setShowPassword
                          )
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        size="small"
                        aria-label="Sifreni goster ve ya gizlet"
                        sx={{ color: TEXT_LIGHT }}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: BORDER_COLOR },
                },
              }}
            />
          </Box>

          {/* sifre tekrari (yalniz qeydiyyatda) */}
          {mode === "register" && (
            <Box>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: TEXT_DARK, mb: 0.5 }}>
                Şifrənin təkrarı
              </Typography>
              <TextField
                id="register-confirm-password"
                name="confirmPassword"
                placeholder="Şifrəni yenidən daxil edin"
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                fullWidth
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            togglePasswordVisibility(
                              "register-confirm-password",
                              setShowConfirmPassword
                            )
                          }
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          size="small"
                          aria-label="Tekrar sifreni goster ve ya gizlet"
                          sx={{ color: TEXT_LIGHT }}
                        >
                          {showConfirmPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    "& fieldset": { borderColor: BORDER_COLOR },
                  },
                }}
              />
            </Box>
          )}

          {/* sertler checkbox-u (yalniz qeydiyyatda) */}
          {mode === "register" && (
            <FormControlLabel
              control={
                <Checkbox
                  id="agree-terms"
                  name="agreeTerms"
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

          {/* tesdiq duymesi */}
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

          {/* google girisi (yalniz login rejiminde) */}
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

          {/* rejim deyisdirme linki */}
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