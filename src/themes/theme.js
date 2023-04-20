import { teal, yellow, pink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
// https://mui.com/material-ui/customization/theming/
export const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: teal[700]
    },
    secondary: {
      main: pink[400],
    },
  }
})
