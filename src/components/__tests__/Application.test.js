import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes schedule when new day selected", async () => {
  const {getByText} = render(<Application />);

  await waitForElement(() => getByText("Monday"))
  
  fireEvent.click(getByText("Tuesday"));
  
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
});
