import { render, screen } from "@testing-library/react";
import App from "./App";

test("loads and displays a disabled button", async () => {
  render(<App />);

  expect(screen.getByLabelText("Duration in bed"));
  expect(screen.getByLabelText("Duration asleep"));
  expect(screen.getByRole("button")).toBeDisabled();
});
