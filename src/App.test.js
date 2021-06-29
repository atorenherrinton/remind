/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { render, screen } from "@testing-library/react";
import { setUid } from "./slices/authenticate-slice";
import App from "./App";

describe("App", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	test("renders the authentication page if there is no user", () => {
		expect(screen.getByTitle("authenticate"));
	});

	test("if there is no user the authentication page is displayed", () => {
		store.dispatch(setUid(undefined));
		expect(screen.getByTitle("authenticate"));
	});

	test("if there is a user the main page is displayed", () => {
		store.dispatch(setUid("uP0PcYMj5geFKrFWR8QPE8ON80E2"));
		expect(screen.getByTitle("main"));
	});
});
