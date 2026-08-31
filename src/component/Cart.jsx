import {
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import { useShop } from "../provider/ShopProvider";

function Cart() {
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
  } = useShop();

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#faf8f6",
        px: { xs: 2, md: 8 },
        py: 6,
      }}
    >
      {/* BAŞLIQ */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            letterSpacing: 1,
          }}
        >
          Səbətim
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#777",
          }}
        >
          Seçdiyiniz məhsullar
        </Typography>
      </Box>

      {/* BOŞ SƏBƏT */}
      {cart.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2 }}
          >
            Səbətiniz boşdur
          </Typography>

          <Typography
            sx={{
              color: "#777",
              mb: 4,
            }}
          >
            Bəyəndiyiniz məhsulları səbətə əlavə edin.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#222",
              px: 4,
              py: 1.5,

              "&:hover": {
                backgroundColor: "#444",
              },
            }}
          >
            Alış-verişə davam et
          </Button>
        </Box>
      ) : (
        /* DOLU SƏBƏT */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gap: 5,
          }}
        >
          {/* MƏHSULLAR */}
          <Box>
            {cart.map((product) => (
              <Box key={product.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 3,
                  }}
                >
                  {/* MƏHSUL MƏLUMATLARI */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#888",
                        mt: 0.5,
                      }}
                    >
                      {product.category}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontWeight: 500,
                      }}
                    >
                      {product.price} AZN
                    </Typography>
                  </Box>

                  {/* MİQDAR + SİL */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {/* AZALT */}
                    <Button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      sx={{
                        minWidth: 35,
                        color: "#222",
                        fontSize: 20,
                      }}
                    >
                      −
                    </Button>

                    {/* MİQDAR */}
                    <Typography
                      sx={{
                        minWidth: 25,
                        textAlign: "center",
                      }}
                    >
                      {product.quantity}
                    </Typography>

                    {/* ARTIR */}
                    <Button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      sx={{
                        minWidth: 35,
                        color: "#222",
                        fontSize: 20,
                      }}
                    >
                      +
                    </Button>

                    {/* SİL */}
                    <IconButton
                      onClick={() =>
                        removeFromCart(product.id)
                      }
                      sx={{
                        ml: 2,
                        color: "#555",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        🗑
                      </span>
                    </IconButton>
                  </Box>
                </Box>

                <Divider />
              </Box>
            ))}
          </Box>

          {/* SİFARİŞ XÜLASƏSİ */}
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 4,
              height: "fit-content",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 500,
              }}
            >
              Sifariş xülasəsi
            </Typography>

            {/* MƏHSULLAR */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>
                Məhsullar
              </Typography>

              <Typography>
                {total} AZN
              </Typography>
            </Box>

            {/* ÇATDIRILMA */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography>
                Çatdırılma
              </Typography>

              <Typography>
                Pulsuz
              </Typography>
            </Box>

            <Divider />

            {/* ÜMUMİ */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Ümumi
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {total} AZN
              </Typography>
            </Box>

            {/* SİFARİŞ */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.6,
                backgroundColor: "#222",

                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            >
              Sifarişi rəsmiləşdir
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
