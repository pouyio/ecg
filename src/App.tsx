import "./App.css";

import { Container } from "@mui/material";
import { Chart } from "./components/Chart";
import { FileControls } from "./components/FileControls";
import { FileUpload } from "./components/FileUpload";
import { useGlobal } from "./hooks/useGlobal";
import { Header } from "./components/Header";

function App() {
  const { file } = useGlobal();

  return (
    <Container>
      <Header />
      {file ? (
        <>
          <Chart />
          <FileControls />
        </>
      ) : (
        <FileUpload />
      )}
    </Container>
  );
}

export default App;
