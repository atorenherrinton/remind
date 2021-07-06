/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Alert from "./error-alert";

describe("Alert", () => {
	const message = "this user already exists";
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Alert message={message} />
			</Provider>
		);
	});

	test("renders an Alert", () => {
		expect(screen.getByTitle("error-alert"));
	});

	test("renders the correct alert text", () => {
		expect(screen.getByText(message));
	});
});
