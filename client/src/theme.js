import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: 'dark',
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            // borderWidth: "1.5px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
  },
});

export default theme;
