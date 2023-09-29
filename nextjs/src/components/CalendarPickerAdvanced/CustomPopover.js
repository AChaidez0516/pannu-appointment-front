import Popover from '@mui/material/Popover'
import { ThemeProvider, createTheme } from '@mui/material/styles';



export const CustomPopover = ({ children, open, onClose, anchorEl }) => {

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#EEEEEE',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{ marginTop: 10 }}
      >
        {children}
      </Popover>
    </ThemeProvider>
  )
}