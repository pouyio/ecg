import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GlobalContext, GlobalContextValue } from "../../contexts/global";
import { Header } from "./Header";

describe("Header", () => {
  it("Should not show the refresh button", async () => {
    const { queryByText } = render(<Header />);

    expect(queryByText("🔄")).toBeFalsy();
  });

  it("Should show the refresh button when file is loaded", () => {
    const testFile = new File([""], "mock_data.txt");
    const { getByText } = render(
      <GlobalContext.Provider
        value={{ file: testFile } as unknown as GlobalContextValue}
      >
        <Header />
      </GlobalContext.Provider>
    );

    expect(getByText("🔄")).toBeTruthy();
  });
});
