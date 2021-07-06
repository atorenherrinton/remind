/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { reset } from "../../slices/reminders-slice";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddReminder from "./add-reminder";

describe("Reminder List", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<AddReminder />
			</Provider>
		);
	});
	afterEach(() => {
		store.dispatch(reset());
	});

	test("renders a button", () => {
		expect(screen.getByRole("button"));
	});

	test("the button text displays Add Reminder", () => {
		expect(screen.getByRole("button")).toHaveTextContent("Add Reminder");
	});

	test("renders a text field when button is clicked", () => {
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("textbox"));
	});

	test("renders a text field that autofocuses when button is clicked", () => {
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("textbox").parentElement).toHaveClass("Mui-focused");
	});

	test("the textfield has autocomplete turned off", () => {
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("textbox").autocomplete).toEqual("off");
	});

	test("the text field value matches what has been typed", () => {
		userEvent.click(screen.getByRole("button"));
		const test = "testing123";
		userEvent.type(screen.getByRole("textbox"), test);
		expect(screen.getByRole("textbox")).toHaveDisplayValue(test);
	});

	test("the value of the text field resets when the return key is pressed", () => {
		userEvent.click(screen.getByRole("button"));
		const test = "testing123";
		userEvent.type(screen.getByRole("textbox"), test + "{enter}");
		userEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("textbox")).toHaveDisplayValue("");
	});

	test("the button becomes visible when the return key is pressed", () => {
		userEvent.click(screen.getByRole("button"));
		const test = "testing123";
		userEvent.type(screen.getByRole("textbox"), test + "{enter}");
		expect(screen.getAllByRole("button")).toHaveLength(1);
	});

	test("the text field disappears when the return key is pressed", () => {
		userEvent.click(screen.getByRole("button"));
		const test = "testing123";
		userEvent.type(screen.getByRole("textbox"), test + "{enter}");
		expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
	});

	test("a new reminder cannot be created when the text field is empty", () => {
		userEvent.click(screen.getByRole("button"));
		userEvent.type(screen.getByRole("textbox"), "{enter}");
		expect(screen.queryByTitle("reminder-item")).not.toBeInTheDocument();
	});
});
