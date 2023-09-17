import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("Renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Idoven.ai Coding Challenge")).toBeTruthy();
  });
});
