/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { setUid } from "../../slices/authenticate-slice";
import { reset, setReminders } from "../../slices/reminders-slice";
import { render, screen } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ReminderList from "./reminder-list";

describe("Reminder List", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
	});
	afterEach(() => {
		store.dispatch(reset());
	});

	test("renders a heading", () => {
		expect(screen.getByRole("heading"));
	});

	test("renders a divider", () => {
		expect(screen.getByRole("divider"));
	});

	test("renders a list", () => {
		expect(screen.getByRole("list"));
	});

	test("renders no ReminderItem elements if none exist in the reminders list", () => {
		expect(screen.queryByTitle("reminder-item")).not.toBeInTheDocument();
	});

	test("renders one ReminderItem elements if only one exist in the reminders list", () => {
		const reminders = [{ title: "take out the trash", id: uuidv4() }];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});

		expect(screen.getAllByTitle("reminder-item")).toHaveLength(1);
	});

	test("renders one ReminderItem elements for each item in the reminders list", () => {
		const reminders = [
			{ title: "take out the trash", id: uuidv4() },
			{ title: "brush your teeth", id: uuidv4() },
			{ title: "walk the dogs", id: uuidv4() },
		];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});

		expect(screen.getAllByTitle("reminder-item")).toHaveLength(reminders.length);
	});

	test("displays the correct text for each reminder", () => {
		const reminders = [
			{ title: "take out the trash", id: uuidv4() },
			{ title: "brush your teeth", id: uuidv4() },
			{ title: "walk the dogs", id: uuidv4() },
		];

		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
			expect(screen.getByText(reminder.title));
		});
	});

	test("renders no listItem when component first renders", () => {
		expect(screen.queryByRole("reminder-item")).not.toBeInTheDocument();
	});

	test("a new reminder is created when the return key is pressed", () => {
		store.dispatch(setUid("6x09QvrfPAdhL523gnzJhzjpjQ72"));
		userEvent.click(screen.getByRole("button"));
		const test = "testing123";
		userEvent.type(screen.getByRole("textbox"), test + "{enter}");
		expect(screen.getByRole("item-text"));
	});
});
