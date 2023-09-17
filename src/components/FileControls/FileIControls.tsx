import {
  Button,
  Card,
  CardContent,
  Chip,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import { CHUNK_SIZE } from "../../utils/constants";
import { StyledBox, StyledTextField } from "./FileControls.styled";

const formatter = new Intl.NumberFormat();

export const FileControls: React.FC = () => {
  const { file, chunk, updateChunk } = useGlobal();
  const [tempChunk, setTempChunk] = useState(chunk);

  useEffect(() => {
    setTempChunk(chunk);
  }, [chunk]);

  const safeFileSize = file?.size ?? 0;

  const size = safeFileSize / 1024;
  let formattedSize = 0;
  let units = "";

  if (size < 1024) {
    formattedSize = size;
    units = "KB";
  } else if (size < 1024 * 1024) {
    formattedSize = size / 1024;
    units = "MB";
  } else {
    formattedSize = size / (1024 * 1024);
    units = " GB";
  }

  const moveRight = () => {
    updateChunk((oldOffset) => oldOffset + 1);
  };
  const moveLeft = () => {
    updateChunk((oldOffset) => oldOffset - 1);
  };

  const totalChunks = Math.ceil(safeFileSize / CHUNK_SIZE);

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="end">
          <Chip label={`${formatter.format(formattedSize)} ${units}`} />
        </Stack>
        <Typography marginBottom={"2rem"} align="center">
          Chunk{" "}
          <StyledTextField
            type="number"
            variant="standard"
            value={chunk}
            onChange={(e) => updateChunk(+e.target.value)}
            inputProps={{ max: totalChunks }}
          />
          /{totalChunks}.
          <br />
          💡 Move using the arrows, slider or typing the chunk number.
          <br />
          💡 While zoomed id, hold shift to move the chart around chart
        </Typography>
        <StyledBox>
          <Button
            title="Previous"
            variant="contained"
            onClick={moveLeft}
            disabled={chunk <= 1}
          >
            ⬅️
          </Button>
          <Slider
            id="chunk-slider"
            aria-label="chunk"
            value={tempChunk}
            onChange={(_, value) => setTempChunk(value as number)}
            onChangeCommitted={(_, value) => updateChunk(value as number)}
            valueLabelDisplay="auto"
            min={1}
            max={totalChunks}
          />
          <Button
            title="Next"
            variant="contained"
            onClick={moveRight}
            disabled={chunk >= totalChunks}
          >
            ➡️
          </Button>
        </StyledBox>
      </CardContent>
    </Card>
  );
};
