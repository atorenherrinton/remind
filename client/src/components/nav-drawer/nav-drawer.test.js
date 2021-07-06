/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { reset, setReminders } from "../../slices/reminders-slice";
import { render, screen } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NavDrawer from "./nav-drawer";

describe("Navigation Drawer", () => {
	test("renders an drawer", () => {
		render(
			<Provider store={store}>
				<NavDrawer />
			</Provider>
		);
		expect(screen.getByTitle("navigation-drawer"));
	});

	test("renders an toolbar", () => {
		render(
			<Provider store={store}>
				<NavDrawer />
			</Provider>
		);
		expect(screen.getByRole("toolbar"));
	});

	test("renders a navagation link container", () => {
		render(
			<Provider store={store}>
				<NavDrawer />
			</Provider>
		);
		expect(screen.getByRole("drawer-container"));
	});

	test("renders a list", () => {
		render(
			<Provider store={store}>
				<NavDrawer />
			</Provider>
		);
		expect(screen.getByRole("list"));
	});
	test("renders correct number of list items", () => {
		const listItems = [0, 1, 2];
		render(
			<Provider store={store}>
				<NavDrawer listItems={listItems} />
			</Provider>
		);

		expect(screen.getAllByTitle("nav-drawer-list-item")).toHaveLength(listItems.length);
	});

	test("renders the correct text for each list item", () => {
		const listItems = [
			{ itemText: "Important Reminders", icon: "Today" },
			{ itemText: "Scheduled", icon: "Schedule" },
			{ itemText: "Completed", icon: "CheckCircle" },
		];
		render(
			<Provider store={store}>
				<NavDrawer listItems={listItems} />
			</Provider>
		);

		listItems.forEach((listItem) => {
			expect(screen.getByText(listItem.itemText));
		});
	});

	test("renders the correct icon for each list item", () => {
		const listItems = [
			{ itemText: "Important Reminders", icon: "Today" },
			{ itemText: "Scheduled", icon: "Schedule" },
			{ itemText: "Completed", icon: "CheckCircle" },
		];
		render(
			<Provider store={store}>
				<NavDrawer listItems={listItems} />
			</Provider>
		);
		listItems.forEach((listItem) => {
			expect(screen.getByTitle(listItem.icon));
		});
	});
});
