import { useContext } from "react";
import { GlobalContext } from "../contexts/global";

export const useGlobal = () => {
  const { chunk, updateChunk, file, updateFile } = useContext(GlobalContext);

  return { chunk, updateChunk, file, updateFile };
};
