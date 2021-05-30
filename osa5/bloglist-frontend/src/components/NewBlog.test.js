import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlog from "./newBlog";

test("NewBlog calls event Handler with correct information", () => {
  const addNewBlog = jest.fn();

  const component = render(<NewBlog addNewBlog={addNewBlog} />);

  const authorInput = component.container.querySelector("#author");
  const titleInput = component.container.querySelector("#title");
  const urlInput = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(authorInput, {
    target: { value: "Tuomas" },
  });
  fireEvent.change(titleInput, {
    target: { value: "Testing of forms could be easier with Cypress" },
  });
  fireEvent.change(urlInput, {
    target: { value: "www.com" },
  });

  fireEvent.submit(form);

  expect(addNewBlog.mock.calls).toHaveLength(1);
  expect(addNewBlog.mock.calls[0][0].title).toBe(
    "Testing of forms could be easier with Cypress"
  );
  expect(addNewBlog.mock.calls[0][0].url).toBe("www.com");
  expect(addNewBlog.mock.calls[0][0].author).toBe("Tuomas");
});
