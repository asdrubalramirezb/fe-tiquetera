import { ReactNode, useMemo } from 'react';

// MATERIAL - UI
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// PROJECT IMPORTS
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // HEADER CONTENT
  const headerContent = useMemo(() => <HeaderContent />, []);
  // COMMON HEADER
  const mainHeader: ReactNode = <Toolbar sx={{ px: { xs: 2, sm: 4.5, lg: 1 } }}>{headerContent}</Toolbar>;

  // APP-BAR PARAMS
  const appBar: AppBarProps = {
    position: 'fixed',
    elevation: 0,
    sx: {
      bgcolor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: 'blur(8px)',
      zIndex: 1200,
      width: `calc(100% - ${25}px)`
    }
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
