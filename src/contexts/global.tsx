import React, { createContext, useState } from "react";

export type GlobalContextValue = {
  chunk: number;
  updateChunk: React.Dispatch<React.SetStateAction<number>>;
  file?: File;
  updateFile: (newFile?: File) => void;
};

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalContext: React.Context<GlobalContextValue> =
  createContext<GlobalContextValue>({} as GlobalContextValue);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [chunk, setChunk] = useState(1);
  const [file, setFile] = useState<File>();

  return (
    <GlobalContext.Provider
      value={{ chunk, updateChunk: setChunk, file, updateFile: setFile }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
