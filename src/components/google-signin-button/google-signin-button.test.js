/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GoogleSignInButton from "./google-signin-button";

describe("Google Sign In Button", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<GoogleSignInButton />
			</Provider>
		);
	});

	test("Continue with Google button displays text Continue with Google", () => {
		expect(screen.getByRole("continue-with-google")).toHaveTextContent("Continue with Google");
	});
});
