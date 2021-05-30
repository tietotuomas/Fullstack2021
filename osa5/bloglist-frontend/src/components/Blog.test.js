import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

let component;
const addLike = jest.fn();
const handleRemove = () => {
  console.log("placeholder");
};

const user = {
  name: "Alan Turing",
  token: "gakjdgnakjgdnk123",
  username: "Turre",
};
const blog = {
  title: "Cypress on oiva apuväline E2E-testaukseen",
  author: "Tuomas",
  url: "cypress.fi",
  likes: 42,
  user: {
    name: "Alan Turing",
    id: "123",
    username: "Turre",
  },
};

beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      addLike={addLike}
      user={user}
      handleRemove={handleRemove}
    />
  );
});

test("Blog renders content correctly at the beginning", () => {
  expect(component.container).toHaveTextContent(
    "Cypress on oiva apuväline E2E-testaukseen"
  );
  expect(component.container).toHaveTextContent("Tuomas");
  expect(component.container).not.toHaveTextContent("42");
  expect(component.container).not.toHaveTextContent("cypress.fi");
});

test("Blog renders content correctly after clicking the view button", () => {
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  expect(component.container).toHaveTextContent(
    "Cypress on oiva apuväline E2E-testaukseen"
  );
  expect(component.container).toHaveTextContent("Tuomas");
  expect(component.container).toHaveTextContent("42");
  expect(component.container).toHaveTextContent("cypress.fi");
});

test("Event handler is called two times after clicking the like button twice", () => {
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});
