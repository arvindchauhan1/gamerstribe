import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f00', // Orange color for primary elements
    },
    secondary: {
      main: '#1976d2', // Blue color for secondary elements
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#1e1e1e', // Slightly lighter background for paper elements
    },
    text: {
      primary: '#ffffff', // White text color
      secondary: '#b0bec5', // Light grey for secondary text
    },
    // Additional custom colors for specific elements
    // Add more as needed for buttons, borders, etc.
    // For gaming theme, consider vibrant colors like green, red, purple, etc.
    // You can adjust these colors to fit your specific design requirements
    custom: {
      green: '#4caf50',
      red: '#f44336',
      purple: '#9c27b0',
    },
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
            borderWidth: "1.5px",
            '&:hover': {
              backgroundColor: theme.palette.custom.green, // Change hover color here
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
