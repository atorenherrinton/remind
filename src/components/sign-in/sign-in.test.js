/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen } from "@testing-library/react";
import { reset, setErrorMessage } from "../../slices/authenticate-slice";
import "@testing-library/jest-dom";
import SignIn from "./sign-in";
import userEvent from "@testing-library/user-event";

describe("Sign In", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<SignIn />
			</Provider>
		);
	});

	test("renders a card", () => {
		expect(screen.getByRole("card"));
	});

	test("renders a card header", () => {
		expect(screen.getByRole("card-header"));
	});

	test("the card header displays Sign in", () => {
		expect(screen.getByRole("card-header")).toHaveTextContent("Sign in");
	});

	test("renders a divider", () => {
		expect(screen.getByRole("divider"));
	});

	test("renders a card content container", () => {
		expect(screen.getByRole("card-content"));
	});

	test("renders an email input", () => {
		expect(screen.getByRole("email-input"));
	});

	test("typing into the email input will store it in the authenticate redux store", () => {
		userEvent.type(screen.getAllByRole("textbox")[0], "test@test.com");
		const storedEmail = store.getState().authenticate.email;
		expect(storedEmail).toEqual("test@test.com");
	});

	test("typing into the email input will have its value matched what's being typed", () => {
		store.dispatch(reset());
		userEvent.type(screen.getAllByRole("textbox")[0], "test@test.com");
		expect(screen.getAllByRole("textbox")[0]).toHaveValue("test@test.com");
	});

	test("renders a form control for the password input", () => {
		expect(screen.getByRole("form-control"));
	});

	test("renders a input label for the password input", () => {
		expect(screen.getByRole("input-label"));
	});

	test("renders an icon button for the password input", () => {
		expect(screen.getByRole("icon-button"));
	});

	test("typing into the password input will store it and its value is stored on the input", () => {
		userEvent.type(screen.getByLabelText("Password"), "password123");
		expect(screen.getByLabelText("Password")).toHaveValue("password123");
	});

	test("renders a sign in button", () => {
		expect(screen.getByRole("sign-in"));
	});

	test("sign up button displays text Sign in", () => {
		expect(screen.getByRole("sign-in")).toHaveTextContent("Sign in");
	});

	test("renders a continue with Google button", () => {
		expect(screen.getByRole("continue-with-google"));
	});

	test("renders a sign up instead button", () => {
		expect(screen.getByRole("sign-up-instead"));
	});

	test("sign in instead button displays text Sign up instead", () => {
		expect(screen.getByRole("sign-up-instead")).toHaveTextContent("Don't have an account? Sign up instead");
	});

	test("if there is a sign in error, an error alert appears", () => {
		store.dispatch(reset());
		store.dispatch(setErrorMessage("No such user exists"));
		expect(screen.getByTitle("error-alert"));
	});
});
