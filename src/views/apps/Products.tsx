'use client';

import { useEffect, useState, ReactElement } from 'react';

// MATERIAL - UI
import { styled, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
import ProductCard from 'components/cards/e-commerce/ProductCard';
import FloatingCart from 'components/cards/e-commerce/FloatingCart';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';

import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';
import ProductFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';

import useConfig from 'hooks/useConfig';
import { resetCart, useGetCart } from 'api/cart';
import { productFilter, useGetProducts } from 'api/products';

// TYPES
import { Products as ProductsTypo, ProductsFilter } from 'types/e-commerce';
import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }: { theme: Theme; open: boolean; container: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: -drawerWidth,
    ...(container && {
      [theme.breakpoints.only('lg')]: {
        marginLeft: !open ? -240 : 0
      }
    }),
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

const ProductsPage = () => {
  const theme = useTheme();

  // product data
  const { productsLoading, products } = useGetProducts();

  const { cart } = useGetCart();
  const { container } = useConfig();

  useEffect(() => {
    // clear cart if complete order
    if (cart && cart.step > 2) {
      resetCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = () => {
    productFilter(filter);
  };

  useEffect(() => {
    if (!productsLoading) {
      filterData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let productResult: ReactElement | ReactElement[] = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
      <SkeletonProductPlaceholder />
    </Grid>
  ));
  if (!productsLoading && products && products.length > 0) {
    productResult = (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <ProductCard
            id={1}
            image={'prod-1.png'}
            name={'SOY CHACHA: PGLO EL SHOW'}
            brand={''}
            offer={''}
            isStock={true}
            description={''}
            offerPrice={20}
            salePrice={19}
            rating={4}
            color={undefined}
            open={openFilterDrawer}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProductCard
            id={2}
            image={'prod-2.png'}
            name={'F*cks News: PAIS DE MIERDA'}
            brand={''}
            offer={''}
            isStock={true}
            description={''}
            offerPrice={40}
            salePrice={39}
            rating={4}
            color={undefined}
            open={openFilterDrawer}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProductCard
            id={3}
            image={'prod-3.png'}
            name={'F*cks News: CLASICO AMERICANO'}
            brand={''}
            offer={''}
            isStock={true}
            description={''}
            offerPrice={30}
            salePrice={29}
            rating={4}
            color={undefined}
            open={openFilterDrawer}
          />
        </Grid>
      </>
    );
  } else if (!productsLoading && products && products.length === 0) {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <WelcomeBanner />
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
      <FloatingCart />
    </Box>
  );
};

export default ProductsPage;
