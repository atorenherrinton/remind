/** @format */

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen } from "@testing-library/react";
import { setUid } from "../../slices/authenticate-slice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NavBar from "./nav-bar";

describe("Navigation Bar", () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<NavBar />
			</Provider>
		);
	});

	it("renders an appbar", () => {
		expect(screen.getByTitle("nav-bar"));
	});

	it("renders an toolbar", () => {
		expect(screen.getByRole("toolbar"));
	});

	it("renders an icon button if there is a user", () => {
		store.dispatch(setUid("uP0PcYMj5geFKrFWR8QPE8ON80E2"));
		expect(screen.getByRole("icon-button"));
	});

	it("renders a menu icon if there is a user", () => {
		store.dispatch(setUid("uP0PcYMj5geFKrFWR8QPE8ON80E2"));
		expect(screen.getByTestId("menu-icon"));
	});

	it("renders no icon button if there is no user", () => {
		store.dispatch(setUid(undefined));
		expect(screen.queryByRole("icon-button")).not.toBeInTheDocument();
	});

	it("renders no menu icon if there is no user", () => {
		store.dispatch(setUid(undefined));
		expect(screen.queryByTestId("menu-icon")).not.toBeInTheDocument();
	});

	it("renders a title", () => {
		expect(screen.getByRole("title"));
	});

	it("the title of the app is named Remind", () => {
		expect(screen.getByRole("title")).toHaveTextContent("Remind");
	});

	it("renders no button if there is no user", () => {
		store.dispatch(setUid(undefined));
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("renders a button if there is a user", () => {
		store.dispatch(setUid("uP0PcYMj5geFKrFWR8QPE8ON80E2"));
		expect(screen.getByRole("button"));
	});

	it("the text in the button displays Sign Out if there is a user", () => {
		store.dispatch(setUid("uP0PcYMj5geFKrFWR8QPE8ON80E2"));
		expect(screen.getByRole("button")).toHaveTextContent("Sign Out");
	});
});
