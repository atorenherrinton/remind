/** @format */

import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Header from "./components/header/header";
import ReminderList from "./components/reminder-list/reminder-list";

describe("App", () => {
  let appWrapper;

  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("renders a header", () => {
    const header = appWrapper.find(Header);
    expect(header).toHaveLength(1);
  });

  it("renders a reminder list", () => {
    const reminderList = appWrapper.find(ReminderList);
    expect(reminderList).toHaveLength(1);
  });
});
