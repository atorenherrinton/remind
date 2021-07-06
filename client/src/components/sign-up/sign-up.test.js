/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen, waitFor } from "@testing-library/react";
import { reset, setErrorMessage } from "../../slices/authenticate-slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SignUp from "./sign-up";

describe("Sign Up", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
	});

	test("renders a card", () => {
		expect(screen.getByRole("card"));
	});

	test("renders a card header", () => {
		expect(screen.getByRole("card-header"));
	});

	test("the card header displays Sign Up", () => {
		expect(screen.getByRole("card-header")).toHaveTextContent("Sign up");
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

	test("renders a sign up button", () => {
		expect(screen.getByRole("sign-up"));
	});

	test("sign up button displays text Sign up", () => {
		expect(screen.getByRole("sign-up")).toHaveTextContent("Sign up");
	});

	test("renders a Continue with Google button", () => {
		expect(screen.getByRole("continue-with-google"));
	});

	test("renders a sign in instead button", () => {
		expect(screen.getByRole("sign-in-instead"));
	});

	test("sign in instead button displays text Sign in instead", () => {
		expect(screen.getByRole("sign-in-instead")).toHaveTextContent("Already have an account? Sign in instead");
	});

	test("if there is a sign up error, an error alert appears", () => {
		store.dispatch(setErrorMessage("No such user exists"));
		expect(screen.getByTitle("error-alert"));
	});

});
