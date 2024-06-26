import { ReactElement, useEffect, useState } from 'react';

// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// TYPES
import { Address } from 'types/e-commerce';
import { CartCheckoutStateProps } from 'types/cart';

// PROJECT IMPORTS
import AddressCard from './AddressCard';
import CartDiscount from './CartDiscount';
import OrderSummary from './OrderSummery';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { useGetAddress } from 'api/address';

// ASSETS
import { ArrowLeft2, CallCalling, Trash } from 'iconsax-react';

const prodImage = '/assets/images/e-commerce';

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

// ==============================|| CHECKOUT - BILLING ADDRESS ||============================== //

interface BillingAddressProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  billingAddressHandler: (billingAddress: Address | null) => void;
  removeProduct: (id: string | number | undefined) => void;
}

const BillingAddress = ({ checkout, onBack, billingAddressHandler, removeProduct }: BillingAddressProps) => {
  const [rows, setRows] = useState(checkout.products);
  const { addressLoading, address } = useGetAddress();
  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  let addressResult: ReactElement | ReactElement[] = (
    <>
      {[1, 2].map((index) => (
        <Grid key={index} item xs={12} lg={6}>
          <MainCard>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width={150} />
                    <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={50} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Box>
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="40%" />
                  </Box>
                  <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      ))}
    </>
  );
  if (address && !addressLoading) {
    addressResult = (
      <>
        <Grid item xs={12} lg={6}>
          <AddressCard
            address={{
              building: 'Primer piso',
              city: 'Medellin',
              country: 'Colombia',
              destination: 'Casa',
              isDefault: true,
              name: 'Giovanny Perez',
              phone: '3205160429',
              post: '050016',
              state: 'Antioquia',
              street: 'Calle 52'
            }}
            billingAddressHandler={billingAddressHandler}
          />
        </Grid>
      </>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Stack spacing={2} alignItems="flex-end">
          <MainCard title="Shipping information">
            <Stack spacing={2}>
              <Grid container spacing={2}>
                {addressResult}
              </Grid>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>First Name :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth placeholder="Enter your first name" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>Last Name :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth placeholder=" Enter your last name" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>Email Id :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth type="email" placeholder="Enter Email id" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>Date of Birth :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <TextField fullWidth placeholder="31" />
                            <Typography>/</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <TextField fullWidth placeholder="12" />
                            <Typography>/</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth placeholder="2021" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>Phone number :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Stack direction="row" spacing={2}>
                        <Grid item xs={2}>
                          <TextField placeholder="+91" />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            type="number"
                            placeholder="Enter the Phone number"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" sx={{ opacity: 0.5, display: { xs: 'none', sm: 'flex' } }}>
                                  <CallCalling />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                      <Stack>
                        <InputLabel>City :</InputLabel>
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth placeholder="Enter City name" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox defaultChecked sx={{ p: 0 }} />
                    <Typography>Save this new address for future shipping</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Button variant="outlined" color="secondary">
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
          <Button variant="text" color="secondary" startIcon={<ArrowLeft2 />} onClick={onBack}>
            <Typography variant="h6" color="textPrimary">
              Back to Cart
            </Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <MainCard>
            <CartDiscount />
          </MainCard>
          <Stack>
            <MainCard title="Order Summery" sx={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }} content={false}>
              {products.map((row, index) => (
                <List
                  key={index}
                  component="nav"
                  sx={{
                    '& .MuiListItemButton-root': {
                      '& .MuiListItemSecondaryAction-root': {
                        alignSelf: 'flex-start',
                        ml: 1,
                        position: 'relative',
                        right: 'auto',
                        top: 'auto',
                        transform: 'none'
                      },
                      '& .MuiListItemAvatar-root': { mr: '7px' },
                      py: 0.5,
                      pl: '15px',
                      pr: '8px'
                    },
                    p: 0
                  }}
                >
                  <ListItemButton divider>
                    <ListItemAvatar>
                      <Avatar
                        alt="Avatar"
                        size="lg"
                        variant="rounded"
                        color="secondary"
                        type="combined"
                        src={row.image ? `${prodImage}/${row.image}` : ''}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          component={Link}
                          href={`/apps/e-commerce/product-details/${row.id}`}
                          target="_blank"
                          variant="subtitle1"
                          color="textPrimary"
                          sx={{ textDecoration: 'none' }}
                        >
                          {row.name}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography color="textSecondary">{row.description}</Typography>
                          <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>${row.offerPrice}</Typography>
                            <Typography color="textSecondary">{row.quantity} items</Typography>
                          </Stack>
                        </Stack>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton size="medium" color="secondary" sx={{ opacity: 0.5, '&:hover': { bgcolor: 'transparent' } }}>
                        <Trash style={{ color: 'secondary.main' }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              ))}
            </MainCard>
            <OrderSummary checkout={checkout} show={false} />
          </Stack>
          <Button variant="contained" fullWidth sx={{ textTransform: 'none' }} onClick={() => billingAddressHandler(null)}>
            Process to Checkout
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BillingAddress;
