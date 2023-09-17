import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GlobalContext, GlobalContextValue } from "../../contexts/global";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("Should show the correct text without a file", () => {
    const { getByText } = render(<FileUpload />);

    expect(getByText("Upload file")).toBeTruthy();
  });

  it("Should call the upload function and store the file", async () => {
    const testFile = new File([""], "mock_data.txt");
    const updateFileMock = vi.fn();
    const { getByTestId } = render(
      <GlobalContext.Provider
        value={{ updateFile: updateFileMock } as unknown as GlobalContextValue}
      >
        <FileUpload />
      </GlobalContext.Provider>
    );

    const fileInput = getByTestId("file-upload");
    await userEvent.upload(fileInput, testFile);

    expect((fileInput as HTMLInputElement).files!.length).toBe(1);
    expect(updateFileMock).toHaveBeenCalled();
  });
});
