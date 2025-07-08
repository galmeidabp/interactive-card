import { render } from "@testing-library/react";
import type React from "react";
import { MemoryRouter } from "react-router-dom";
import { CardProvider } from "../../../context/CardContext";

export function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter><CardProvider>{ui}</CardProvider></MemoryRouter>);
}