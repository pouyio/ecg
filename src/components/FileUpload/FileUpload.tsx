import { Button, Typography } from "@mui/material";
import { useGlobal } from "../../hooks/useGlobal";
import { StyledBox } from "./FileUpload.styled";

export const FileUpload: React.FC = () => {
  const { file, updateFile } = useGlobal();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length && event.target.files[0]) {
      updateFile(event.target.files[0]);
    }
  };
  return (
    <StyledBox>
      <Button
        variant="contained"
        component="label"
        sx={{ padding: "1rem 2rem" }}
      >
        Upload {file && "new"} file
        <input
          type="file"
          accept=".txt"
          data-testid="file-upload"
          onChange={handleFileChange}
          hidden
        />
      </Button>
      <Typography variant="caption" textAlign="right">
        Only .txt accepted
      </Typography>
    </StyledBox>
  );
};
