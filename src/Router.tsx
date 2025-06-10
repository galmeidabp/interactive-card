import { Routes, Route } from "react-router-dom";
import { Completed } from "./pages/Completed";
import { Main } from "./pages/Main";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/completed" element={<Completed />} />
    </Routes>
  )
}