// NEXT
import Image from 'next/image';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// TYPES
import { ThemeMode } from 'types/config';

// ==============================|| ANALYTICS - WELCOME ||============================== //

const WelcomeBanner = () => {
  const theme = useTheme();

  return (
    <MainCard
      border={false}
      sx={{
        color: 'common.white',
        marginBottom: 2.5,
        height: 600,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
        '&:after': {
          content: '""',
          backgroundImage: `url(/assets/images/e-commerce/image-cover.jpg)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5,
          backgroundPosition: 'bottom right',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat'
        }
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3 }}>
            <Typography variant="h2" color="white">
              Conoce mas de F*ck News
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper} color="white">
              Comedy
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                href="https://1.envato.market/c/1289604/275988/4415?subId1=phoenixcoded&u=https%3A%2F%2Fthemeforest.net%2Fitem%2Fable-pro-responsive-bootstrap-4-admin-template%2F19300403"
                sx={{
                  color: 'background.paper',
                  borderColor: theme.palette.background.paper,
                  zIndex: 2,
                  '&:hover': { color: 'background.paper', borderColor: theme.palette.background.paper, bgcolor: 'primary.main' }
                }}
                target="_blank"
              >
                Saber mas
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default WelcomeBanner;
