/** @format */

import React, { useEffect } from "react";
import Authenticate from "./pages/authenticate/authenticate";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Main from "./pages/main/main";
import { setUid, selectUid } from "./slices/authenticate.slice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#322D4E",
        main: "#242038",
        dark: "#211E34",
        contrastText: "#fff",
      },
      secondary: {
        light: "#816BC7",
        main: "#725AC1",
        dark: "#674EBC",
        contrastText: "#fff",
      },
    },
  });

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("user"));
    if (cachedUser) {
      dispatch(setUid(cachedUser.uid));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {uid ? <Main /> : <Authenticate />}
    </ThemeProvider>
  );
};
export default App;
