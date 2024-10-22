import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Wordle from "./Wordle.jsx"

const rootDiv = document.getElementById("root");
const root = createRoot(rootDiv);

root.render(
  <StrictMode>
    <Wordle />
  </StrictMode>
);
