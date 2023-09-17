import { Box, TextField, styled } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "#chunk-slider": {
    margin: "0 2rem",
  },
});

export const StyledTextField = styled(TextField)({
  width: "60px",
  input: {
    paddingTop: 0,
    textAlign: "right",
  },
});
