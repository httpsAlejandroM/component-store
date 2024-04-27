/// <reference types="cypress" />
import 'cypress-localstorage-commands';
//cy.window().its("store").invoke("getState").then(($state)=> {console.log($state);})
//cy.getLocalStorage("token")

describe("User authentication tests", () => {

  it("Redirects to login when clicking the profile icon without being logged in", () => {
    cy.visit("http://localhost:5173/")
    cy.get(".bi-person-fill").click()
    cy.url().should('include', '/login')
  })

  it("Should direct to the user panel when log in", () => {
    cy.visit("http://localhost:5173/")
    cy.get(".bi-person-fill").click()
    cy.url().should('include', '/login')
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("Lagertha@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
      cy.url().should("include", "/dashboard")
    })
  })


})