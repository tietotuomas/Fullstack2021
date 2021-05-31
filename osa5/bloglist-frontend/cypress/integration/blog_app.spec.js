describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Alan Turing",
      username: "testaaja",
      password: "cypress",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("testaaja");
      cy.get("#password").type("cypress");
      cy.get("#login-button").click();

      cy.contains("Alan Turing logged in");
      cy.contains("logout");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Dijkstra");
      cy.get("#password").type("jest");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testaaja", password: "cypress" });
    });

    it("A blog can be created", function () {
      cy.contains("create").click();
      cy.get("#title").type("A blog created by cypress");
      cy.get("#author").type("artificial intelligence");
      cy.get("#url").type("cypress.com");
      cy.contains("Save").click();

      cy.contains("A blog created by cypress");
      cy.contains("artificial intelligence");
    });
  });

  describe("When a blog exists", function () {
    beforeEach(function () {
      cy.login({ username: "testaaja", password: "cypress" });
      cy.createBlog({
        title: "Cypress makes E2E-testing easy",
        author: "Alan Turing",
        url: "www.com",
        likes: 99,
      });
    });

    it("The blog can be liked", function () {
      cy.contains("view").click();

      cy.contains("99");
      cy.contains("like").click();
      cy.contains("100");
    });

    it("The blog can be removed", function () {
      cy.contains("Cypress makes E2E-testing easy");
      cy.contains("view").click();
      cy.contains("remove").click();

      cy.get("html").should("not.contain", "Cypress makes E2E-testing easy");
      cy.get("html").should("not.contain", "view");
    });
  });

  describe("When multiple blogs exist", function () {
    beforeEach(function () {
      cy.login({ username: "testaaja", password: "cypress" });
      cy.createBlog({
        title: "Cypress makes E2E-testing easy",
        author: "Alan Turing",
        url: "www.com",
        likes: 99,
      });
      cy.createBlog({
        title: "React makes frontend development easy",
        author: "Facebook",
        url: "www.facebook.com",
        likes: 100,
      });
    });

    it("Blogs are sorted by likes (most liked first)", function () {
      cy.get("ul li:first").should("contain", "Facebook");
      cy.get("ul li:last").should("contain", "Alan Turing");

      cy.contains("view").click();
      cy.contains("view").click();
      cy.contains("hide").click();
      cy.contains("like").click();
      cy.contains("like").click();
      cy.contains("hide").click();

      cy.get("ul li:first").should("contain", "Alan Turing");
      cy.get("ul li:last").should("contain", "Facebook");
    });
  });
});
