import { Typography, Box, Button } from "@mui/material";

import { useShop } from "../provider/ShopProvider";

function Favorites() {
  const { favorites, toggleFavorite } = useShop();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Sevimlilər
      </Typography>

      {favorites.length === 0 ? (
        <Typography sx={{ mt: 3 }}>
          Sevimli məhsul yoxdur.
        </Typography>
      ) : (
        favorites.map((product) => (
          <Box
            key={product.id}
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid #ddd",
            }}
          >
            <Typography>
              {product.name}
            </Typography>

            <Typography>
              {product.price} AZN
            </Typography>

            <Button
              onClick={() => toggleFavorite(product)}
            >
              Sevimlidən çıxar
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Favorites;