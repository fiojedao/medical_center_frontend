import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';
// https://mui.com/material-ui/customization/theming/

const palette = createPalette();
const components = createComponents({ palette });
const shadows = createShadows();
const typography = createTypography();

export const AppTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  components,
  palette,
  shadows,
  shape: {
    borderRadius: 8
  },
  typography
});