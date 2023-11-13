import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subheading: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subheading?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subheading: true;
  }
}

const defaultTheme = createTheme();

const theme = createTheme({
  typography: {
    h1: {
      ...defaultTheme.typography.h1,
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    subheading: {
      fontSize: "1.4rem",
      ...defaultTheme.typography.h5,
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    h4: {
      fontSize: "1.8rem",
    },
    h5: {
      fontSize: "1.4rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
  },
});

export default responsiveFontSizes(theme);
