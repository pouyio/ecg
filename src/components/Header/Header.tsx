import React from "react";
import { StyledAppBar } from "./Header.styled";
import { Button, Typography } from "@mui/material";
import { useGlobal } from "../../hooks/useGlobal";

export const Header: React.FC = () => {
  const { file, updateFile } = useGlobal();
  return (
    <StyledAppBar>
      <Typography>Idoven.ai Coding Challenge</Typography>
      {file && (
        <Button sx={{ padding: 0 }}>
          <Typography title="Refresh" onClick={() => updateFile()}>
            🔄
          </Typography>
        </Button>
      )}
    </StyledAppBar>
  );
};
