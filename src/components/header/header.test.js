/** @format */

import React from "react";
import Header from "./header";
import { shallow } from "enzyme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

describe("Header", () => {
  let headerWrapper;

  beforeAll(() => {
    headerWrapper = shallow(<Header />);
  });

  it("renders an appbar", () => {
    const appbar = headerWrapper.find(AppBar);
    expect(appbar).toHaveLength(1);
  });

  it("renders an toolbar", () => {
    const toolbar = headerWrapper.find(Toolbar);
    expect(toolbar).toHaveLength(1);
  });

  it("renders an icon button", () => {
    const iconButton = headerWrapper.find(IconButton);
    expect(iconButton).toHaveLength(1);
  });

  it("renders a menu icon", () => {
    const menuIcon = headerWrapper.find(MenuIcon);
    expect(menuIcon).toHaveLength(1);
  });

  it("renders a title", () => {
    const title = headerWrapper.find(Typography);
    expect(title).toHaveLength(1);
  });

  it("the title of the app is named Remind", () => {
    const title = headerWrapper.find(Typography);
    expect(title.text()).toEqual("Remind");
  });

  it("renders a sign in button", () => {
    const signinButton = headerWrapper.find(Button);
    expect(signinButton).toHaveLength(1);
  });
  it("the text in the button displays Sign In", () => {
    const signinButton = headerWrapper.find(Button);
    expect(signinButton.text()).toEqual("Sign In");
  });
});
