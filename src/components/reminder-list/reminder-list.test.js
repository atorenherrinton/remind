/** @format */

import React from "react";
import ReminderList from "./reminder-list";
import { shallow } from "enzyme";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

describe("Reminder List", () => {
  it("renders a list", () => {
    const reminderListWrapper = shallow(<ReminderList />);
    const list = reminderListWrapper.find(List);
    expect(list).toHaveLength(1);
  });

  it("renders no ListItem elements if none exist in the reminders list", () => {
    const reminders = [];
    const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
    const reminderListItems = reminderListWrapper.find(ListItem);

    expect(reminderListItems).toHaveLength(0);
  });

  it("renders one ListItem elements if only one exist in the reminders list", () => {
    const reminders = ["take out the trash"];
    const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
    const reminderListItems = reminderListWrapper.find(ListItem);

    expect(reminderListItems).toHaveLength(1);
  });

  it("renders one ListItem elements for each item in the reminders list", () => {
    const reminders = [
      "take out the trash",
      "brush your teeth",
      "walk the dogs",
    ];
    const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
    const reminderListItems = reminderListWrapper.find(ListItem);

    expect(reminderListItems).toHaveLength(reminders.length);
  });

  it("matches the text for each ListItem in the correct order", () => {
    const reminders = [
      "take out the trash",
      "brush your teeth",
      "walk the dogs",
    ];
    const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
    reminderListWrapper.find(ListItem).forEach((node, i) => {
      expect(node.text()).toEqual(reminders[i]);
    });
  });
});
