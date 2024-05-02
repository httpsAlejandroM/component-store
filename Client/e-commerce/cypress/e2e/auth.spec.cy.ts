/// <reference types="cypress" />
import 'cypress-localstorage-commands';
//cy.window().its("store").invoke("getState").then(($state)=> {console.log($state);})
//cy.getLocalStorage("token")

describe("User authentication tests", () => {

  beforeEach(()=>{
      cy.visit("http://localhost:5173/")
  })

  it("Should redirect to login when trying to access user panel via URL", () => {
    cy.get("[test-id='userNav']").should("be.visible")
    cy.get("[test-id='userNav']").children().should("have.length", 1)
    cy.visit("http://localhost:5173/dashboard")
    cy.url().should("include", "/login")
    cy.get("#loginForm").should("be.visible")
  })
  
  it("Redirects to login when clicking the profile icon without being logged in", () => {
    cy.get(".bi-person-fill").click()
    cy.url().should('include', '/login')
  })

  it("It should show an error message when the email is invalid", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("asgard")
    })
    cy.get("#my-tooltip").should("be.visible")
  })

  it("It should show an error message when the password is invalid", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='password']").type("asgard")
    })
    cy.get("#passwordTooltip").should("be.visible")
  })

  it("It should not allow you to log in until you enter an email and password", ()=> {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("asgard")
      cy.get("[name='password']").should("be.visible")
      cy.get("#loginBtn").should("be.disabled")
    })
  })

  it("Should return an error message when email or password are incorrect", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("asd@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
    })
    cy.get("#errorLogin").children().contains("Correo electrónico o Contraseña incorrectos")
  })

  it("Should direct to the user panel when log in", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("Lagertha@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
    })
    cy.url().should("include", "/dashboard")
  })

  it("When user is logged in, their cart and favorites should appear in the navbar", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("Lagertha@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
    })
    cy.get("[test-id='userNav']").should("be.visible")
    cy.get("[test-id='userNav']").children().should("have.length", 3)
  })

  it("User session should persist", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("Lagertha@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
    })
    cy.visit("https://www.mercadolibre.com/")
    cy.visit("http://localhost:5173/")
    cy.get("[test-id='userNav']").should("be.visible")
    cy.get("[test-id='userNav']").children().should("have.length", 3)
  })

  it("User should be able to log out", () => {
    cy.get(".bi-person-fill").click()
    cy.get("#loginForm").within(() => {
      cy.get("[name='email']").type("Lagertha@asgard.com")
      cy.get("[name='password']").type("123456")
      cy.get("button").contains("Iniciar Sesión").click()
    })
    cy.url().should("include", "/dashboard")
    cy.get("#logOut").click()
    cy.url().should("include", "/login")
    cy.get("[test-id='userNav']").children().should("have.length", 1)
    cy.visit("http://localhost:5173/dashboard")
    cy.url().should("include", "/login")
  })
   
})