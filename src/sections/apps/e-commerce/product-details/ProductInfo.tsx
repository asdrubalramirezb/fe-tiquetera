import { useState } from 'react';

// NEXT
import { useRouter } from 'next/navigation';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// THIRD - PARTY
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

// TYPES
import { ColorsOptionsProps, Products } from 'types/e-commerce';

// PROJECT IMPORTS
import ColorOptions from '../products/ColorOptions';
import Avatar from 'components/@extended/Avatar';
import { addToCart, useGetCart } from 'api/cart';
import { openSnackbar } from 'api/snackbar';

// ASSETS
import { Add, Minus, ShopAdd, ShoppingCart } from 'iconsax-react';

// TYPES
import { ThemeMode } from 'types/config';
import { SnackbarProps } from 'types/snackbar';

// product color select
function getColor(color: string) {
  return ColorOptions.filter((item) => item.value === color);
}

const validationSchema = yup.object({
  color: yup.string().required('Color selection is required')
});

const products: Products[] = [
  {
    categories: ['Comedia'],
    created: new Date(),
    about: '',
    colors: [],
    date: 41,
    discount: 19,
    gender: '',
    new: 2,
    popularity: 4,
    quantity: 1,
    brand: '',
    id: 1,
    image: 'prod-1.png',
    name: 'SOY CHACHA: PGLO EL SHOW',
    description: 'Show de SOY CACHA',
    isStock: true,
    offer: '',
    offerPrice: 20,
    rating: 4,
    salePrice: 19
  },
  {
    categories: ['Comedia'],
    created: new Date(),
    about: '',
    colors: [],
    date: 41,
    discount: 19,
    gender: '',
    new: 2,
    popularity: 4,
    quantity: 1,
    brand: '',
    id: 1,
    image: 'prod-2.png',
    name: 'F*cks News: PAIS DE MIERDA',
    description: 'Show de F*cks News',
    isStock: true,
    offer: '',
    offerPrice: 40,
    rating: 4,
    salePrice: 39
  },
  {
    categories: ['Comedia'],
    created: new Date(),
    about: '',
    colors: [],
    date: 41,
    discount: 19,
    gender: '',
    new: 2,
    popularity: 4,
    quantity: 1,
    brand: '',
    id: 1,
    image: 'prod-3.png',
    name: 'F*cks News: CLASICO AMERICANO',
    description: 'Show de F*cks News',
    isStock: true,
    offer: '',
    offerPrice: 30,
    rating: 4,
    salePrice: 29
  }
];

// ==============================|| COLORS OPTION ||============================== //

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({}: { product: Products; id: string }) => {
  const route = useRouter();
  const splited = window.location.pathname.split('/');
  const product = products[Number(splited[splited.length - 1]) - 1];
  const theme = useTheme();

  const [value, setValue] = useState<number>(1);
  const { cart } = useGetCart();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product.id,
      name: product.name,
      image: product.image,
      salePrice: product.salePrice,
      offerPrice: product.offerPrice,
      color: '',
      size: '',
      quantity: 1
    },
    validationSchema,
    onSubmit: (values: any) => {
      values.quantity = value;
      addToCart(values, cart.products);
      openSnackbar({
        open: true,
        message: 'Submit Success',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);

      route.push('/apps/e-commerce/checkout');
    }
  });

  const { errors, values, handleSubmit, handleChange } = formik;

  const addCart = () => {
    values.color = values.color ? values.color : 'primaryDark';
    values.quantity = value;
    addToCart(values, cart.products);
    openSnackbar({
      open: true,
      message: 'Add To Cart Success',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating name="simple-controlled" value={product.rating} precision={0.1} readOnly />
        <Typography color="textSecondary">({product.rating?.toFixed(1)})</Typography>
      </Stack>
      <Typography variant="h3">{product.name}</Typography>
      <Chip
        size="small"
        label={product.isStock ? 'In Stock' : 'Out of Stock'}
        sx={{
          width: 'fit-content',
          borderRadius: '4px',
          color: product.isStock ? 'success.main' : 'error.main',
          bgcolor: product.isStock ? 'success.lighter' : 'error.lighter'
        }}
      />
      <Typography color="textSecondary">{product.about}</Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack justifyContent="flex-end" spacing={1}>
                <Typography color="textSecondary">Quantity</Typography>
                <Stack direction="row">
                  <TextField
                    name="rty-incre"
                    value={value > 0 ? value : ''}
                    onChange={(e: any) => setValue(Number(e.target.value))}
                    sx={{ '& .MuiOutlinedInput-input': { p: 1.75 }, width: '33%', '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                  <Stack>
                    <Button
                      key="one"
                      color="secondary"
                      variant="outlined"
                      onClick={() => setValue(value + 1)}
                      sx={{
                        px: 0.25,
                        py: 0.25,
                        minWidth: '0px !important',
                        borderRadius: 0,
                        borderLeft: 'none',
                        borderColor: theme.palette.secondary[400],
                        '&:hover': { borderLeft: 'none', borderColor: theme.palette.secondary[400] },
                        '&.Mui-disabled': { borderLeft: 'none', borderColor: theme.palette.secondary.light }
                      }}
                    >
                      <Add />
                    </Button>
                    <Button
                      key="three"
                      color="secondary"
                      variant="outlined"
                      disabled={value <= 1}
                      onClick={() => setValue(value - 1)}
                      sx={{
                        px: 0.5,
                        py: 0.35,
                        minWidth: '0px !important',
                        borderRadius: 0,
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderColor: theme.palette.secondary[400],
                        '&:hover': { borderTop: 'none', borderLeft: 'none', borderColor: theme.palette.secondary[400] },
                        '&.Mui-disabled': { borderTop: 'none', borderLeft: 'none', borderColor: theme.palette.secondary.light }
                      }}
                    >
                      <Minus />
                    </Button>
                  </Stack>
                </Stack>
                {value === 0 && (
                  <FormHelperText sx={{ color: theme.palette.error.main }}>Please select quantity more than 0</FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h3">${product.offerPrice}</Typography>
                {product.salePrice && (
                  <Typography variant="h4" color="textSecondary" sx={{ textDecoration: 'line-through', opacity: 0.5, fontWeight: 400 }}>
                    ${product.salePrice}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  disabled={value < 1 || !product.isStock}
                  color="primary"
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                >
                  {!product.isStock ? 'Sold Out' : 'Buy Now'}
                </Button>

                {product.isStock && value > 0 && (
                  <Button color="secondary" variant="outlined" size="large" onClick={addCart} startIcon={<ShopAdd variant="Bold" />}>
                    Add to Cart
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default ProductInfo;
