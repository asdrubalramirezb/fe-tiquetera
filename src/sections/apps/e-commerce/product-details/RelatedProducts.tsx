import { ReactElement, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/navigation';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// PROJECT IMPORTS
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';

import { useGetReleatedProducts } from 'api/products';
import { openSnackbar } from 'api/snackbar';

// ASSETS
import { Heart } from 'iconsax-react';

// TYPES
import { SnackbarProps } from 'types/snackbar';
import { Products } from 'types/e-commerce';

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

const ListProduct = ({ product }: { product: Products }) => {
  const theme = useTheme();
  const router = useRouter();

  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favourites',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const linkHandler = (id?: string | number) => {
    router.push(`/apps/e-commerce/product-details/${id}`);
  };

  return (
    <ListItemButton divider onClick={() => linkHandler(product.id)} sx={{ borderRadius: 0 }}>
      <ListItemAvatar>
        <Avatar
          alt="Avatar"
          size="xl"
          color="secondary"
          variant="rounded"
          type="combined"
          src={product.image ? `/assets/images/e-commerce/${product.image}` : ''}
          sx={{ borderColor: theme.palette.divider, mr: 1 }}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography variant="h5">{product.name}</Typography>}
        secondary={
          <Stack spacing={1}>
            <Typography color="textSecondary">{product.description}</Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="h5">{product.salePrice ? `$${product.salePrice}` : `$${product.offerPrice}`}</Typography>
                {product.salePrice && (
                  <Typography variant="h6" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                    ${product.offerPrice}
                  </Typography>
                )}
              </Stack>
              <Rating
                name="simple-controlled"
                value={product.rating! < 4 ? product.rating! + 1 : product.rating}
                readOnly
                precision={0.1}
              />
            </Stack>
          </Stack>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          size="medium"
          color="secondary"
          sx={{ opacity: wishlisted ? 1 : 0.5, '&:hover': { bgcolor: 'transparent' } }}
          onClick={addToFavourite}
        >
          {wishlisted ? (
            <Heart variant="Bold" style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
          ) : (
            <Heart style={{ fontSize: '1.15rem' }} />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ id }: { id?: string }) => {
  const { relatedProductsLoading, relatedProducts } = useGetReleatedProducts(id!);

  const [related, setRelated] = useState<Products[]>(relatedProducts);

  useEffect(() => {
    if (!relatedProductsLoading) {
      setRelated(relatedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, relatedProductsLoading]);

  let productResult: ReactElement | ReactElement[] = (
    <List>
      {[1, 2, 3].map((index: number) => (
        <ListItem key={index}>
          <ListItemAvatar sx={{ minWidth: 72 }}>
            <Skeleton variant="rectangular" width={62} height={62} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation="wave" height={22} />}
            secondary={
              <>
                <Skeleton animation="wave" height={14} width="60%" />
                <Skeleton animation="wave" height={18} width="20%" />
                <Skeleton animation="wave" height={14} width="35%" />
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  if (related && !relatedProductsLoading) {
    productResult = (
      <List
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
        {products.map((product: Products, index) => (
          <ListProduct key={index} product={product} />
        ))}
      </List>
    );
  }

  return (
    <SimpleBar sx={{ height: { xs: '100%', md: 'calc(100% - 62px)' } }}>
      <Grid item>
        <Stack>
          {productResult}
          <Button color="secondary" variant="outlined" sx={{ mx: 2, my: 4, textTransform: 'none' }}>
            View all Products
          </Button>
        </Stack>
      </Grid>
    </SimpleBar>
  );
};

export default RelatedProducts;
