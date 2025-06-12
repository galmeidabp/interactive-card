import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { CardProvider } from "./context/CardContext";

export function App() {
  return (
    <CardProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CardProvider>
  )
}

